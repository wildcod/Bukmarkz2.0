import re
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from accounts.models import CustomUser
from accounts.tasks import send_contact_email, send_reset_password_email
from bookmarks.models import Bookmark, Category
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.dispatch import receiver
from django.core.mail import EmailMultiAlternatives
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import permissions, generics, status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.token_blacklist.models import (BlacklistedToken,
                                                             OutstandingToken)
from rest_framework_simplejwt.tokens import RefreshToken
from knox.models import AuthToken
from .serializers import SendResetPasswordSerializer, UserSerializer, RegisterSerializer, LoginSerializer, ContactSerializer
from rest_framework.views import APIView
from django.conf import settings
from mailings.services import send_email
import requests
from bs4 import BeautifulSoup
from django.views.decorators.csrf import csrf_exempt
from twilio.twiml.messaging_response import MessagingResponse
from django.db import transaction
from rest_auth.serializers import PasswordResetConfirmSerializer
from rest_auth.views import APIView, LoginView
from rest_framework_simplejwt.tokens import RefreshToken

from django.http import HttpResponse

from .otp_services import (
    create_email_otp,
    get_user_email_otp,
    validate_otp,
    check_otp_state,
    get_email_otp_data,
    check_otp_existence
)

from .user_services import (
    check_user_subscription_validation
)

import re

sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters("password1", "password2")
)

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        instance, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "expiry": instance.expiry,
            
        })


# # Login API
class LoginAPI(LoginView):
    queryset = ""
    template_name = "login.html"
    allowed_methods = ("POST","GET")


    def get(self, request):
        users = CustomUser.objects.all()
        serializer = LoginSerializer(users, many=True)
        return Response(serializer.data)

    def get_response(self, request):
        serializer_class = self.get_response_serializer()
        if getattr(settings, "REST_USE_JWT", False):
            data = {"user": self.user, "token": self.token}
            serializer = serializer_class(
                instance=data, context={"request": self.request}
            )
        else:
            serializer = serializer_class(
                instance=self.token, context={"request": self.request}
            )
        context = {
            'data': serializer.data,
            'status': status.HTTP_200_OK,
        }
        response = JsonResponse(context)

        return response

    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(
            data=self.request.data, context={"request": request}
        )
        if self.serializer.is_valid():
            self.login()

        else:
            print("errors", self.serializer.errors)
            response = HttpResponse(json.dumps({'error': self.serializer.errors}), 
                content_type='application/json')
            response.status_code = 400
            return response
        return self.get_response(request)

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        check_user_subscription_validation(self.request.user)

        return self.request.user


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """

    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}/reset_password/confirm/{}".format(settings.MAIN_URL, reset_password_token.key),
        # 'site_name': site_shortcut_name,
        # 'site_domain': site_url
    }

    # render email text
    email_html_message = render_to_string(
        'accounts/user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'accounts/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="bukmarkz"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@bukmarkz.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


class EmailOTPVIew(APIView):
    def get(self, *args, **kwargs):
        try:
            user = self.request.user
        except:
            return Response(data='Request Failed', status=400)

        # check if there already exists an OTP for request.user
        check_otp_existence(user)

        # create otp
        emailOTP = create_email_otp(user)

        email_data = get_email_otp_data(emailOTP, user)
        send_email(email_data, email_type='getOTP')

        return Response(data='OTP created', status=200)

    def post(self, *args, **kwargs):
        try:
            data = self.request.data
            user = self.request.user
        except:
            return Response(data='Invalid data sent', status=400)

        emailOTP = get_user_email_otp(user)
        return validate_otp(emailOTP, data['otp'])


class CheckAccessOTPView(APIView):
    def get(self, *args, **kwargs):
        try:
            user = self.request.user
        except:
            return Response(data='non user', status=400)

        try:
            emailOTP = get_user_email_otp(user)

            return check_otp_state(emailOTP)

        except:
            return Response(data='OTP not found', status=400)




@csrf_exempt
def incoming_message(request):
    user_no = request.POST.get('From')
    url = request.POST.get('Body')
    if user_no and url:
      
        user_ph_number = user_no.replace('whatsapp:', '')

        # checking whether link is valid
        regex = re.compile(
            r'^https?://'
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'
            r'localhost|'
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
            r'(?::\d+)?'
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)

        valid_url = regex.match(url)
        if valid_url is not None:
            with transaction.atomic():
                try:
                    mathcing_users = CustomUser.objects.filter(phone_number=str(user_ph_number)).exists()
                    if mathcing_users:
                        mathcing_user = CustomUser.objects.filter(phone_number=str(user_ph_number)).first()
                        category_existing = Category.objects.filter(user=mathcing_user, title='WhatsApp').exists()
                        if not category_existing:
                            category = Category(
                                user=mathcing_user,
                                title='WhatsApp',
                                color='#00FF00',
                                private=True
                            )
                            category.save()
                        else:
                            category = Category.objects.filter(user=mathcing_user)[0]
                        # making requests instance
                        reqs = requests.get(valid_url.group(0))
                        
                        # using BeautifulSoup module
                        soup = BeautifulSoup(reqs.text, 'html.parser')
                        
                        # displaying the title
                        print("Title of the website is : ")
                        tits=[]
                        for title in soup.find_all('title'):
                            if title.get_text()=='It needs a human touch':
                                name='whatsapp_bookmark'
                            else:
                                name=title.get_text()
                            tits.append(name)

                        new_bookmark = Bookmark(
                            category=category,
                            name=tits[0],
                            url=valid_url.group(0),
                            description='description'
                        )

                        new_bookmark.save()

                        message_text = "Great! the link will be added to your bookmarks list"
                    else:
                        message_text = "No user exists with this number"
                except:
                    message_text = "Something went wrong"
                    transaction.set_rollback(True)

        else:
            message_text = "Invalid Link! Please try again"

        response = MessagingResponse()
        response.message(message_text)
        return HttpResponse(str(response))
    else:
        print("Webhook is not active")


class ContactAPIView(ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = ""


    def dispatch(self, *args, **kwargs):
        return super(ContactAPIView, self).dispatch(*args, **kwargs)
    
    def get_serializer(self, *args, **kwargs):
        return ContactSerializer(*args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            send_contact_email.delay(serializer.data['email'], serializer.data['topic'], serializer.data['message'])
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        else:
            data = []
            emessage=serializer.errors 

            print(serializer.errors)

            for key in emessage:
                err_message = str(emessage[key])
                err_string = re.search("string=(.*), code", err_message)
                message_value = err_string.group(1)
                final_message = f"{key} - {message_value}"
                data.append(final_message)

            response = HttpResponse(json.dumps({'error': data}), 
                content_type='application/json')
            response.status_code = 400
            return response


class PasswordResetView(ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    allowed_methods = ("POST", "OPTIONS", "HEAD", "GET")
    serializer_class = SendResetPasswordSerializer


    def get_serializer(self, *args, **kwargs):
        return SendResetPasswordSerializer(*args, **kwargs)

    def get(self, request):
        serializer = SendResetPasswordSerializer(context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid():
                email = request.data.get("email", None)
                
                try:
                    user = CustomUser.objects.get(email=email)
                    send_reset_password_email.delay(user.pk)
                    
                    return Response(
                        {"detail": _("A password reset link has been sent to your email address")},
                        status=status.HTTP_200_OK,
                    )
                except CustomUser.DoesNotExist:
                    response = HttpResponse(json.dumps({'err': ['This email does not exist']}), 
                        content_type='application/json')
                    response.status_code = 400
                    return response
            else:
                data = []
                emessage=serializer.errors 
                for key in emessage:
                    err_message = str(emessage[key])
                    err_string = re.search("string='(.*)', ", err_message) 
                    message_value = err_string.group(1)
                    final_message = f"{key} - {message_value}"
                    data.append(final_message)
                response = HttpResponse(json.dumps({'err': data}), 
                    content_type='application/json')
                response.status_code = 400
                return response
        except Exception as exc:
            print(exc)
            response = HttpResponse(json.dumps({'err': ['Something went wrong']}), 
                        content_type='application/json')
            response.status_code = 400
            return response



class PasswordResetConfirmView(ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PasswordResetConfirmSerializer
    renderer_classes = [TemplateHTMLRenderer, ]
    template_name = 'index.html'
    
    
    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_serializer(self, *args, **kwargs):
        return PasswordResetConfirmSerializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except CustomUser.DoesNotExist:
                response = HttpResponse(json.dumps({'err': ['Something went wrong!']}), 
                    content_type='application/json')
                response.status_code = 400
                return response
            return JsonResponse({'data':serializer.data, 'status':status.HTTP_200_OK})
        else:
            data = []
            emessage=serializer.errors 
            for key in emessage:
                err_message = str(emessage[key])
                err_string = re.search("string='(.*)', ", err_message) 
                message_value = err_string.group(1)
                final_message = f"{key} - {message_value}"
                data.append(final_message)
            response = HttpResponse(json.dumps({'err': data}), 
                content_type='application/json')
            response.status_code = 400
            return response
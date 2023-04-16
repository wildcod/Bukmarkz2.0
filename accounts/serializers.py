from django.core.exceptions import ObjectDoesNotExist
from requests import request
from rest_framework import serializers
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from django_countries.serializers import CountryFieldMixin
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import Country, CustomUser
from .user_services import (
    create_user, subscribe_user_as_free_trial,
    initialize_referral_account, handle_referral_registration,
    send_welcome_email
)


class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model =CustomUser
        fields = (
                'id', 'username', 'email','phone_number', 'country', 'is_superuser',
                'is_subscribed')
        

# Register Serializer
class CountrySerializer(serializers.Serializer):
    class Meta:
        model= Country
        field=('country')
class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.CharField(default='', required=False)
    phone=serializers.CharField(source='phone_number')
    country= serializers.CharField(max_length=50, default='IN')
    email = serializers.EmailField()
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password','country', 'phone', "token")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data,):
        extra_fields ={'phone_number':validated_data['phone_number']}
        
        user= CustomUser.objects.create(email=validated_data['email'], username=validated_data['username'],country=validated_data['country'],**extra_fields)
        user.set_password(validated_data['password'])
        user.save()
        
        token = RefreshToken.for_user(user)
        # create free trial subscription for new user
        try:
            subscribe_user_as_free_trial(user)
        except ObjectDoesNotExist:
            pass

        # create referral object for new user
        initialize_referral_account(user)

        # create ref relation if exists
        if validated_data['token'] != '':
            try:
                handle_referral_registration(validated_data['token'], user)
            except Exception:
                pass
        #send_welcome_email(user)
        return user


# # login Serializer
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()
    
#     def __init__(self, *args, **kwargs):
#         super(LoginSerializer, self).__init__(*args, **kwargs)

#         self.request = self.context.get("request")



#     def _validate_username(self,username, password):
#         user = None

#         if username and password:
#             user = self.authenticate(username=username, password=password)
#         else:
#             msg = ('Must include "username" and "password".')
#             raise exceptions.ValidationError(msg)
#         token = RefreshToken.for_user(user)
        
#         return {
#             'user': user, 
#             'token': token
#         }

    # class Meta:
    #     model = User
    #     fields = ('username', 'password')
    # def validate(self, attrs):
    #     print("DATA--->", attrs['username'])
    #     print(self.request)
    #     user = self.request.user
    #     print(user)
    #     # user = authenticate(username=validated_data['username'], password=validated_data['password'])
    #     user = CustomUser.objects.filter(username=user, password=attrs['password']).first()
    #     # login_user = login(self.request, user)
    #     login_user = authenticate(username=attrs['username'], password=attrs['password'])
    #     print("LOGIN USER:", login_user)
    #     if login_user:
    #         return user
    #     raise serializers.ValidationError("Incorrect Credentials")

# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(style={"input_type": "password"})

#     def authenticate(self, **kwargs):
#         return authenticate(self.context["request"], **kwargs)

#     def _validate_email(self, email, password):
#         user = None

#         if email and password:
#             user = self.authenticate(email=email, password=password)
#         else:
#             msg = ('Must include "username" and "password".')
#             raise exceptions.ValidationError(msg)

#         return user

#     def _validate_username(self, username, password):
#         user = None

#         if username and password:
#             user = self.authenticate(username=username, password=password)
#         else:
#             msg = _(
#                 'Must include "username or "email" and "password".'
#             )
#             raise exceptions.ValidationError(msg)

#         return user

#     def _validate_username_email(self, username, email, password):
#         user = None

#         if email and password:
#             user = self.authenticate(email=email, password=password)
#         elif username and password:
#             user = self.authenticate(username=username, password=password)
#         else:
#             msg = _(
#                 'Must include either  "email" and "password".'
#             )
#             raise exceptions.ValidationError(msg)

#         return user

#     def validate(self, attrs):
#         username = attrs.get("username")
#         email = attrs.get("email")
#         password = attrs.get("password")
        
#         user = None

#         if username:
#             user = self._validate_username_email(username, "", password)
    
#         if user:
#             if not user.is_active:
#                 msg = ("User account is inactive.")
#                 raise exceptions.ValidationError(msg)
#         else:
#             msg = ("please check your username or password.")
#             raise exceptions.ValidationError(msg)

        

#         attrs["user"] = user
#         token = RefreshToken.for_user(attrs["user"])
#         token = {
#             "refresh_token": str(token),
#             "access_token": str(token.access_token)
#         }
#         return attrs

        

class ContactSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    topic = serializers.CharField(required=True)
    message = serializers.CharField(required=True)


class SendResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={"input_type": "password"})

    def authenticate(self, **kwargs):
        return authenticate(self.context["request"], **kwargs)

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def _validate_username(self, username, password):
        user = None

        if username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _(
                'Must include "username or "email" and "password".'
            )
            raise exceptions.ValidationError(msg)

        return user

    def _validate_username_email(self, username, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        elif username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _(
                'Must include either "username" or "email" and "password".'
            )
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = None

        if username:
            user = self._validate_username_email(username, "", password)

        if user:
            if not user.is_active:
                msg = _("User account is inactive.")
                raise exceptions.ValidationError(msg)
        else:
            msg = _("please check your username or password.")
            raise exceptions.ValidationError(msg)

   
        attrs["user"] = user
        token = RefreshToken.for_user(attrs["user"])
        token = {
            "refresh_token": str(token),
            "access_token": str(token.access_token)
        }
        return attrs

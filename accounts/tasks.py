from accounts.models import CustomUser
from celery import shared_task

from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes

import ssl

from mailings.services import send_email
ssl._create_default_https_context = ssl._create_unverified_context


url = "https://www.bukmarkz.com/"


@shared_task(bind=True, max_retries=20)
def send_register_mail(self, user_id):
    user = CustomUser.objects.filter(id=user_id).first()

    body = {
        'username': user.username,
    }

    subject = "Verify Email Address"
    recipients = [user.email]

    template_name = 'accounts/welcome_email.html'
    
    try:
        send_email(body, subject, recipients, template_name, "html")
        return "Email Is Sent"
    except Exception as e:
        print("Email not sent ", e)
        raise self.retry(exc=e, countdown=25200)


@shared_task(bind=True, max_retries=20)
def send_contact_email(self, email, topic, message):
    subject = topic
    recipients = email

    body = {
        'email': email,
        'message': message,
    }

    template_name = 'emails/contact_email_template.html'
    
    try:
        send_email(body, subject, recipients, template_name, "html")
        return "Email Is Sent"
    except Exception as e:
        print("Email not sent ", e)
        raise self.retry(exc=e, countdown=25200)
    

@shared_task(bind=True, max_retries=1)
def send_reset_password_email(self, user_id):
    user = CustomUser.objects.get(id=user_id)
    body = {
        'reset_url': url + 'password/reset/confirm/' + urlsafe_base64_encode(force_bytes(user.pk)) + '/' + default_token_generator.make_token(user)
    }
    
    subject = "Reset Your password"
    recipients = [user.email]

    template_name = 'accounts/user_reset_password.html'

    try:
        send_email(body, subject, recipients, template_name, "html")
        return "Email Is Sent"
    except Exception as e:
        print("Email not sent ", e)
        raise self.retry(exc=e, countdown=25200)
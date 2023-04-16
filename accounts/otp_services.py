import string, random
import datetime
from .models import EmailOTP
from rest_framework.response import Response


def create_email_otp(user):
    otp = _get_random_string()
    expires = datetime.datetime.today() + datetime.timedelta(minutes=20)
    return EmailOTP.objects.create(
        user=user,
        otp=otp,
        expires=expires,
    )


def validate_otp(emailOTP, otp):
    if emailOTP and emailOTP.otp == otp:
        if emailOTP.is_expired():
            emailOTP.delete()
            return Response(data='Expired OTP')

        emailOTP.validated = True
        emailOTP.save()
        return Response(data='validation success', status=200)
    return Response(data='wrong otp', status=400)


def get_user_email_otp(user):
    try:
        return EmailOTP.objects.get(user=user)
    except:
        return None


def check_otp_state(emailOTP):
    if emailOTP.is_expired():
        emailOTP.delete()
        return Response(data='session expired', status=400)

    if emailOTP.validated:
        return Response(data='OTP validated and not expired', status=200)

    return Response(data='OTP expired and was not validated', status=400)


def get_email_otp_data(emailOTP, user):
    return {
        'to_emails': [user.email],
        'subject': 'Bukmarkz OTP',
        'otp': emailOTP.otp,
    }


def check_otp_existence(user):
    try:
        obj = EmailOTP.objects.get(user=user)
        obj.delete()
    except:
        pass


def _get_random_string():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(6))


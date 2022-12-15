from knox.models import AuthToken
import random
import string
from django.template.loader import render_to_string
from django.conf import settings



def create_knox_token(token_model, user, serializer):
    token = AuthToken.objects.create(user=user)
    return token


def generate_ref_token():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))

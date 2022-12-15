import datetime

from django.contrib.auth import get_user_model
from django.db import transaction

from accounts.models import Country
from accounts.utils import generate_ref_token
from mailings.services import send_email
from referral.models import Referral, RefRelation
from subscription.models import UserSubscription, Subscription


def check_user_subscription_validation(user):
    try:
        userSub = UserSubscription.objects.get(user=user)
        if userSub.is_expired:
            userSub.user.is_subscribed = False
            userSub.user.save()
            userSub.delete()
        else:
            userSub.user.is_subscribed = True
            userSub.user.save()
    except UserSubscription.DoesNotExist:
        pass


def get_country(country):
    country, created = Country.objects.get_or_create(
        country=country
    )
    return country


def create_user(username, email, password, country):
    country_entity = get_country(country)

    return get_user_model().objects.create_user(
        username=username,
        email=email,
        password=password,
        country=country,
    )


def subscribe_user_as_free_trial(user):
    subscription = Subscription.objects.get(name='Premium')
    expires = datetime.date.today() + datetime.timedelta(
        days=subscription.trial_period
    )

    userSubscription = UserSubscription.objects.create(
        user=user,
        subscription=subscription,
        expires=expires,
        trial=True,
    )
    user.is_subscribed = True
    user.save()

    return userSubscription


def handle_referral_registration(referral_token, registered_user):
    referral_account = get_referral_account_by_token(referral_token)
    with transaction.atomic():
        create_referral_relation(referral_account.user, registered_user)
        increment_referral_account_registrations(referral_account)


def initialize_referral_account(user):
    return Referral.objects.create(
        user=user,
        token=generate_ref_token(),
    )


def create_referral_relation(referrer, user):
    RefRelation.objects.create(
        referrer=referrer,
        user=user,
    )


def get_referral_account_by_token(token):
    return Referral.objects.get(token=token)


def increment_referral_account_registrations(referral_account):
    referral_account.registrations += 1
    referral_account.save()


def send_welcome_email(user):
    send_email(
        email_data={
                'to_emails': user.email,
                'subject': 'Welcome',
                'email': user.email
        },
        email_type='WelcomeEmail'
    )

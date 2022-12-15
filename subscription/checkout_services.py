import requests
import stripe
from django.conf import settings
from django.db import transaction
from rest_framework.response import Response

from .converter import converter, BASE_CURRENCY
from .models import Subscription, Payment, UserSubscription
import datetime
from referral.models import RefRelation, Referral
from .utils import get_visitor_ip_address, get_currency_url

stripe.api_key = settings.STRIPE_SECRET_KEY


def checkout_subscription(user, stripeToken, subscription_id):
    subscription = get_subscription_by_id(subscription_id)

    amount, currency = get_subscription_price(subscription)
    amount = convert_amount_to_zero_decimal(amount, currency)
    charge = create_stripe_charge(stripeToken, amount, currency)

    with transaction.atomic():
        save_payment_charge(charge['id'], user, amount)
        add_user_to_subscribed(user, subscription)
        update_referral_relation(user, subscription)
    return charge


def convert_amount_to_zero_decimal(amount, currency):
    if currency.upper() == BASE_CURRENCY.upper():
        return amount * 100
    return amount


def get_converted_amount(amount, to_currency):
    return converter.convert(
        BASE_CURRENCY.upper(),
        to_currency.upper(),
        amount,
    ), to_currency


def get_user_currency(request):
    user_ip = get_visitor_ip_address(request)
    currency = requests.get(get_currency_url(user_ip)).text
    if currency == 'Undefined':
        currency = BASE_CURRENCY
    return currency


def get_subscription_price(subscription):
    if subscription.is_discountable:
        amount = subscription.discount_price
    else:
        amount = subscription.price
    return amount, BASE_CURRENCY


def create_stripe_charge(
        stripeToken,
        amount_zero_decimal,
        currency=BASE_CURRENCY,
):
    return stripe.Charge.create(
        amount=amount_zero_decimal,
        currency=currency.lower(),
        source=stripeToken
    )


def get_subscription_by_id(subscription_id):
    return Subscription.objects.get(id=subscription_id)


def save_payment_charge(charge_id, user, amount):
    return Payment.objects.create(
        stripe_charge_id=charge_id,
        user=user,
        amount=amount / 100
    )


def add_user_to_subscribed(user, subscription):
    try:
        user.is_subscribed = True
        user.save()
        expires = datetime.date.today() + datetime.timedelta(days=366)
        userSubscription = _create_user_subscription_object(user, subscription,
                                                            expires)
    except:
        return Response(data='Can not add user to subscribed', status=400)


def update_referral_relation(user, subscription):
    try:
        refRelation = RefRelation.objects.get(user=user)
        referrer = Referral.objects.get(referrer=refRelation.referrer)
        referrer.subs += 1
        referrer.wallet += subscription.price // 2
        referrer.save()
    except:
        pass


def get_subscription(name):
    try:
        return Subscription.objects.get(name=name)
    except:
        return Response(data='No subscription found', status=400)


def update_user_wallet(referral, amount):
    referral.wallet -= amount
    referral.save()


def _create_user_subscription_object(user, subscription, expires):
    return UserSubscription.objects.create(
        user=user,
        subscription=subscription,
        expires=expires
    )

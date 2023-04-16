from .models import Withdraw
import datetime
from referral.models import Referral


def create_user_withdraw(user, withdraw_data=None):
    return Withdraw.objects.create(
        user=user,
        card_number=withdraw_data['card_number'],
        expiry_date=withdraw_data['expiry_date'],
        name=withdraw_data['name'],
        cvc=withdraw_data['cvc'],
        amount=withdraw_data['amount'],
    )


def get_user_referral_profile(user):
    try:
        return Referral.objects.get(user=user)
    except:
        return None


def validated_data(data):
    return True


def validate_withdraw(referral, amount):
    if referral.wallet < amount and referral.subs < 3:
        return False
    return True


def get_withdraw_data_from_input(input_data):
    try:
        return {
            'expiry_date': _get_datetime_object_from_input(input_data['expiry_date']),
            'amount': int(input_data['amount']),
            'card_number': input_data['card_number'],
            'name': input_data['name'],
            'cvc': input_data['cvc'],
        }
    except:
        return None


def _get_datetime_object_from_input(date):
    year = '20' + date[3:5]
    month = date[:2]
    return datetime.date(int(year), int(month), 1)

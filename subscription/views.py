from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserSubscription, Subscription
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import SubscriptionSerializer, UserSubscriptionSerializer
from rest_framework import permissions
from .withdraw_services import (
    create_user_withdraw,
    validated_data,
    get_user_referral_profile,
    validate_withdraw,
    get_withdraw_data_from_input,
)

from .checkout_services import (
    get_subscription,
    create_stripe_charge,
    save_payment_charge,
    add_user_to_subscribed,
    update_referral_relation,
    update_user_wallet, checkout_subscription, get_user_currency,
)
from rest_framework import status
from mailings.services import send_email


class WithdrawView(APIView):
    permission_classes = [
            permissions.IsAuthenticated
    ]

    def post(self, *args, **kwargs):
        try:
            input_data = self.request.data
            user = self.request.user
        except:
            return Response(data='invalid card details',
                            status=status.HTTP_400_BAD_REQUEST)

        referral = get_user_referral_profile(user=user)
        print(input_data)
        if validated_data(data=input_data):

            withdraw_data = get_withdraw_data_from_input(input_data)
            print(withdraw_data)
            if validate_withdraw(referral,
                                 withdraw_data['amount']) and withdraw_data:
                withdraw = create_user_withdraw(user=user,
                                                withdraw_data=withdraw_data)

            update_user_wallet(referral, withdraw_data['amount'])

        email_data = {
                'to_emails': self.request.user.email,
                'subject': 'Withdraw Request'
        }

        send_email(email_data=email_data, email_type='RequestWithdraw')

        return Response(status=status.HTTP_200_OK)


class CheckoutAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            user = self.request.user
            data = self.request.data
        except:
            return Response(
                data='Invalid data provided',
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_subscribed:
            return Response(
                data='User is already subscribed',
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            checkout_subscription(
                user,
                data['stripeToken'],
                data['subscription']
            )
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SubscriptionDetailsAPIView(APIView):
    def get(self, *args, **kwargs):
        user = self.request.user
        try:
            userSub = UserSubscription.objects.get(user=user)
            days_remaining = userSub.expires - userSub.started
            return Response(data=days_remaining, status=200)
        except:
            return Response(data='User not subbed')


class UserSubscriptionAPIView(ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSubscriptionSerializer

    def get_queryset(self):
        return UserSubscription.objects.filter(user=self.request.user)


class PayFromWalletAPIView(APIView):
    def post(self, *args, **kwargs):
        try:
            user = self.request.user
            data = self.request.data
        except:
            return Response(data='Invalid request',
                            status=status.HTTP_400_BAD_REQUEST)

        if user.is_subscribed:
            return Response(data='Already sub', status=status.HTTP_200_OK)

        subscription = get_subscription(data['subscription'])

        referral = get_user_referral_profile(user=user)

        if referral.wallet < subscription.price:
            return Response(data='Not enough money',
                            status=status.HTTP_400_BAD_REQUEST)

        add_user_to_subscribed(user, subscription)

        update_user_wallet(referral, subscription.price)

        return Response(data='success', status=status.HTTP_200_OK)


class SubscriptionReadOnlyViewSet(ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        request = self.request
        currency = get_user_currency(request)
        subscriptions = Subscription.objects.all()
        for subscription in subscriptions:
            subscription.currency = currency
        return subscriptions

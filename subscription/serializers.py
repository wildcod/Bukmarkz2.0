from rest_framework import serializers

from .checkout_services import get_user_currency, get_converted_amount
from .converter import BASE_CURRENCY
from .models import (
    Withdraw, Subscription, SubscriptionFeature,
    UserSubscription
)


class WithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdraw
        fields = '__all__'


class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = '__all__'


class SubscriptionFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionFeature
        fields = ('id', 'name', 'description')


class SubscriptionSerializer(serializers.ModelSerializer):
    features = serializers.SerializerMethodField('get_subscription_features')
    price = serializers.SerializerMethodField('get_price')
    discount_price = serializers.SerializerMethodField('get_discount_price')
    is_free = serializers.SerializerMethodField('get_is_free')

    class Meta:
        model = Subscription
        fields = '__all__'

    def get_subscription_features(self, subscription):
        request = self.context.get('request')
        features = subscription.features.all()
        serializer = SubscriptionFeatureSerializer(
            instance=features, many=True,
            context={'request': request}
        )
        return serializer.data

    def get_price(self, subscription):
        currency = subscription.currency
        if currency.upper() is not BASE_CURRENCY.upper():
            amount, currency = get_converted_amount(
                subscription.price,
                currency
            )
            return amount
        return subscription.price

    def get_discount_price(self, subscription):
        currency = subscription.currency
        if subscription.is_discountable and currency.upper() is not BASE_CURRENCY.upper():
            amount, currency = get_converted_amount(
                subscription.discount_price,
                currency
            )
            return amount
        return subscription.discount_price

    def get_is_free(self, subscription):
        return subscription.is_free

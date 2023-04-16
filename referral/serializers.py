from rest_framework import serializers
from .models import Referral, RefRelation
from django.contrib.auth import get_user_model


class ReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referral
        fields = '__all__'


class RefRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefRelation
        fields = ('user', 'referrer')











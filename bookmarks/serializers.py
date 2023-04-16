from rest_framework import serializers

from .models import Category, Bookmark, Recommendation, HelpUser, EmailBookmark
from django.contrib.auth import get_user_model
from django_countries.serializers import CountryFieldMixin


class CategorySerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Category
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Bookmark
        fields = '__all__'


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'


class HelpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpUser
        fields = '__all__'


class AdminDashboardSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class EmailBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailBookmark
        fields = '__all__'

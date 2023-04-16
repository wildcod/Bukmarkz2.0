from rest_framework import serializers
from .models import Bookmark
from bookmarks.models import Category


class CategoryShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('title',)

class BookmarkSerializer(serializers.ModelSerializer):
    category_name=CategoryShortSerializer(many=True,source='category_title')
    class Meta:
        model = Bookmark
        fields = ('id','file','category_name')
    
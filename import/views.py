from copy import deepcopy

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookmarkSerializer
from rest_framework.decorators import action
from bs4 import BeautifulSoup
from bookmarks.models import Bookmark, Category
from rest_framework import permissions
from bookmarks.serializers import CategorySerializer
from .services import (import_from_browser_bookmarks, validate_import_file,_validate_categories)
from django.core.exceptions import PermissionDenied


class BookmarkViewset(viewsets.ModelViewSet):
    """ View for bookmark parse """
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()
    http_method_names = ['post']

    permission_classes = [
        permissions.IsAuthenticated
    ]
    @action(methods=['post'], detail=False)
    def importFile(self, request, *args, **kwargs):
        file_main = request.FILES['file']
        category_name = request.data['category']
        soup = BeautifulSoup(file_main, 'lxml')
        createdCategories = []
        if not soup:
            return Response(data='Can not open file', status=status.HTTP_400_BAD_REQUEST)
        container = import_from_browser_bookmarks(soup, createdCategories, request.user)
        validated = validate_import_file(soup, request.user,container,createdCategories)
        try:
            if not validated :
                return Response(data='too much bookmarks',status=status.HTTP_400_BAD_REQUEST)

            import_from_browser_bookmarks(soup, createdCategories, request.user)

            serializer = CategorySerializer(createdCategories, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False)
    def add_bookmark(self, request, *args, **kwargs):
        try:
            category_id = request.data['category']
            url = request.data['url']
            title = request.data['title']
            description = request.data['description']
            category_obj = Category.objects.get(id=category_id)
            Bookmark.objects.create(
                category=category_obj, name=title, url=url, description=description)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

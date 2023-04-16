from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required 
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Bookmark, Recommendation, HelpUser, Category
from .serializers import (
    CategorySerializer,
    BookmarkSerializer,
    RecommendationSerializer,
    HelpUserSerializer,
    AdminDashboardSerializer,
    EmailBookmarkSerializer,
)
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from knox.auth import TokenAuthentication
from rest_framework.authentication import TokenAuthentication

from .services import (
    get_new_user_emails,
    add_email_bookmarks_to_dashboard,
)


class BookmarkViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticated
    ]
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        categories = Category.objects.filter(user=self.request.user)
        bookmarks = []
        for category in categories:
            bookmarks += Bookmark.objects.filter(category=category)

        return bookmarks

    def update(self, request, *args, **kwargs):
        try:
            instance = Bookmark.objects.get(pk=kwargs['pk'])
            serializer = BookmarkSerializer(instance=instance,
                                            data=request.data)
            if serializer.is_valid():
                bookmark = serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)

        except Bookmark.DoesNotExist:
            serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            bookmark = serializer.save()
            return Response(serializer.data, status=200)

        return Response(data='', status=200)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = Bookmark.objects.get(pk=kwargs['pk'])
            instance.delete()
            return Response(data='deleted', status=200)

        except Bookmark.DoesNotExist:
            return Response(data='bookmark not found', status=400)


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = CategorySerializer

    def get_queryset(self):
        print(self.request.user)
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecommendationViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.AllowAny
    ]
    serializer_class = RecommendationSerializer

    @method_decorator(login_required(login_url='/'))
    def dispatch(self, *args, **kwargs):
        return super(RecommendationViewSet, self).dispatch(*args, **kwargs)

    def get_queryset(self):
        return self.request.user.recommendation.all()


class HelpUserViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticated
    ]

    serializer_class = HelpUserSerializer

    def get_queryset(self):
        return self.request.user.helpuser.all()


class AdminDashboardViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAdminUser
    ]

    serializer_class = AdminDashboardSerializer
    queryset = get_user_model().objects.all()


class AllRecommsViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAdminUser
    ]

    serializer_class = RecommendationSerializer
    queryset = Recommendation.objects.all()


class AllAidsViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAdminUser
    ]
    serializer_class = HelpUserSerializer
    queryset = HelpUser.objects.all()


class EmailBookmarkViewSet(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticated
    ]
    serializer_class = EmailBookmarkSerializer

    def get_queryset(self):
        new_emails = get_new_user_emails(self.request.user)
        add_email_bookmarks_to_dashboard(new_emails, self.request.user)

        return self.request.user.emailbookmark.all()

# class BookmarkViewSet(viewsets.ModelViewSet):
#     serializer_class = BookmarkSerializer
#     queryset = Bookmark.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]


# class BookmarkListView(ListAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = BookmarkSerializer


# class BookmarkDetailView(RetrieveAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = BookmarkSerializer


# class BookmarkCreateView(CreateAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = BookmarkSerializer


# class BookmarkUpdateView(UpdateAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = BookmarkSerializer


# class BookmarkDeleteView(DestroyAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = BookmarkSerializer


from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from bookmarks.models import Category




class Bookmark(models.Model):
    file = models.FileField(blank=True)
    category = models.ForeignKey(Category, related_name='bookmarks',on_delete=models.CASCADE)
#     author = models.ForeignKey(settings.AUTH_USER_MODEL,
#                                on_delete=models.CASCADE)


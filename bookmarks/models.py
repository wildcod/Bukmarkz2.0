from django.db import models
from django.utils import timezone
from django.conf import settings


class Category(models.Model):
    """Category of Bookmarks"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='category')
    title = models.CharField(max_length=500)
    color = models.CharField(max_length=10, default="#000000")
    timestamp = models.DateTimeField(default=timezone.now)
    private = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return "{}".format(self.title)

    class Meta:
        verbose_name_plural = "Categories"


class Bookmark(models.Model):
    """Bookmarks for personal dashboard"""
    category = models.ForeignKey(
        Category, related_name='bookmark', on_delete=models.CASCADE)
    name = models.TextField()
    url = models.URLField(default='', max_length=255)
    description = models.TextField(max_length=70, blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{} in {}".format(self.name, self.category)


class Recommendation(models.Model):
    """Recommendation to user"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name='recommendation')
    title = models.CharField(max_length=200)
    url = models.URLField(default='', max_length=300)
    description = models.CharField(max_length=265, blank=True, null=True)
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} for {self.user.username}'


class HelpUser(models.Model):
    """User information about what he searches"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name='helpuser')
    country = models.CharField(max_length=100, blank=True, null=True)
    zip = models.CharField(max_length=10)
    searching = models.CharField(max_length=265)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    added = models.DateTimeField(auto_now_add=True)
    checked = models.BooleanField(default=False)

    def __str__(self):
        return self.searching


class EmailBookmark(models.Model):
    """Bookmarks send to email from phone/tablet"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name='emailbookmark')
    title = models.CharField(max_length=200)
    url = models.URLField(default='', max_length=300)
    description = models.CharField(max_length=265, blank=True, null=True)
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} for {self.user.username}'

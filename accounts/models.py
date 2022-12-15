from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField
from django.contrib.auth import get_user_model
from django.utils import timezone
from offers.models import Offer


class CustomUser(AbstractUser):
    country = CountryField(blank=True, null=True)
    is_subscribed = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=50)

    class Meta:
        indexes = [models.Index(fields=['phone_number',])]


class EmailOTP(models.Model):
    """OTP for user when he accesses privacy board"""
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    otp = models.CharField(max_length=32)
    validated = models.BooleanField(default=False)
    expires = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.username

    def is_expired(self):
        expire_date = self.expires
        print(timezone.now())
        if expire_date > timezone.now():
            return False
        else:
            return True


class Country(models.Model):
    """Countries from where are or where registered users"""
    country = CountryField()

    def __str__(self):
        return self.country.name

    def get_users(self):
        users = get_user_model().objects.filter(country=self.country)
        return len(users)

    def get_offers(self):
        offers = Offer.objects.filter(country=self.country)
        return len(offers)

    class Meta:
        verbose_name_plural = "Countries"

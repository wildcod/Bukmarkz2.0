from rest_framework import viewsets, permissions

from .serializers import OfferSerializer
from .services import get_all_offers, get_offers_by_country


class OfferViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OfferSerializer

    def get_queryset(self):
        return get_offers_by_country(country=self.request.user.country)


class AllOffers(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = OfferSerializer

    def get_queryset(self):
        return get_all_offers()

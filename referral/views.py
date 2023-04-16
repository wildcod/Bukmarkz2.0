from rest_framework import viewsets, permissions, status
from .serializers import ReferralSerializer, RefRelationSerializer
from .models import Referral, RefRelation
from rest_framework.views import APIView
from rest_framework.response import Response


class ReferralView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ReferralSerializer

    def get_queryset(self):
        return Referral.objects.filter(user=self.request.user)


class RefRelationView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = RefRelationSerializer

    def get_queryset(self):
        return RefRelation.objects.filter(user=self.request.user)


class ReferralTokensView(APIView):
    def get(self, *args, **kwargs):
        tokens = [referral.token for referral in Referral.objects.all()]
        return Response(data=tokens, status=status.HTTP_200_OK)

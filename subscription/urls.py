from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (CheckoutAPIView, WithdrawView, SubscriptionDetailsAPIView, PayFromWalletAPIView,
                    SubscriptionReadOnlyViewSet, UserSubscriptionAPIView)

urlpatterns = [
    path('api/checkout/', CheckoutAPIView.as_view(), name='checkout'),
    path('api/withdraw/', WithdrawView.as_view(), name='withdraw'),
    path('api/pay_from_wallet/', PayFromWalletAPIView.as_view(), name='pay_from_wallet'),
    path('api/subscription-details/', SubscriptionDetailsAPIView.as_view(), name='subDetails'),
]

router = DefaultRouter()

router.include_root_view = False

router.register('api/subscription/user_subscription', UserSubscriptionAPIView, basename='user_subscription')
router.register('api/subscription', SubscriptionReadOnlyViewSet, basename='subscription')

urlpatterns += router.urls

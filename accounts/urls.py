from django.urls import path
from .views import PasswordResetConfirmView, PasswordResetView, RegisterAPI, LoginAPI, UserAPI,LogoutView , EmailOTPVIew, CheckAccessOTPView, ContactAPIView, incoming_message

urlpatterns = [
    # path('api/auth', include('knox.urls')),
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', LogoutView.as_view(), name='knox_logout'),
    path('api/emailOtp/', EmailOTPVIew.as_view(), name='emailOtp'),
    path('api/check_otp/', CheckAccessOTPView.as_view(), name='checkOtp'),
    path('message/', incoming_message, name='incoming_message'),
    path('send/contact-email/', ContactAPIView.as_view(), name='send_contact_email'),
    path("reset/password/", PasswordResetView.as_view(), name="rest_password_reset"),
    path("password/reset/confirm/<str:uidb64>/<str:token>/", PasswordResetConfirmView.as_view(),name="password_reset_confirm",),
]

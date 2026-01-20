from django.urls import path
from .views import signup, login, update_profile

urlpatterns = [
    path("signup/", signup),
    path("login/", login),
    path("update-profile/", update_profile),
]
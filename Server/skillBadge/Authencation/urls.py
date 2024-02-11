from django.contrib import admin
from django.urls import path
from Authencation import views
urlpatterns = [

    path('signup/', views.SignupPage.as_view(), name='signup'),  # DRF Signup endpoint
    path('login/', views.LoginPage.as_view(), name='login'),    # DRF Login endpoint
    # path('logout/', views.LogoutPage.as_view(), name='logout'),  # DRF Logout endpoint

]
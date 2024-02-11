from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('badge-assign/', BadgeAssignmentAPIView.as_view(), name='badge-assignment'),  # DRF Signup endpoint
    path('crud/', BadgeDetailsAPIView.as_view(), name='badge-crud'),   
    path('apply_for_issuer/', EditIssuerDetails.as_view(), name='Apply_user'),
    path('apply_for_org/', ApplyOrg.as_view(), name='Apply_Org'),
    path('delete/<int:id>/', DeleteIssuerDetails.as_view(), name='Delete_Issuser'),
    path('verify/', VerifyBadgeAPIView.as_view(), name='Verify Badge'),
    
]

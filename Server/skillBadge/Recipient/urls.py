from django.contrib import admin
from django.urls import path, include
from Recipient.views import GetBadgesView, AllUsers, GetbyidDetail,GetUser,UserUpdate,AllBadges

from django.conf import settings
from django.conf.urls.static import static

    
urlpatterns = [
    path('getbadge/',GetBadgesView.as_view()),
    path('getid/<int:user_id>/',GetbyidDetail.as_view()),
    path('alluser/' ,AllUsers.as_view()),
    path('userdetail/',GetUser.as_view()),
    path('update-user/', UserUpdate.as_view(), name='update_user'),
    path('allbadges/', AllBadges.as_view(), name='allbages'),
    
]

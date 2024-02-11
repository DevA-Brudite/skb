from django.shortcuts import render
from Authencation.models import CustomUser
from Organisation.Serializers import UserSerializer

def get_user(request):
    username = request.user
    user_details = CustomUser.objects.get(username=username)
    user = UserSerializer(user_details)
    return user.data


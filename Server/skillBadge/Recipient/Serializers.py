from rest_framework import serializers
from .models import *
from Organisation.models import Badge_Assignment
from Organisation.models import Badges
from Authencation.models import CustomUser
from Organisation.Serializers import BadgesSerializer


class RecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipients
        fields = '__all__'

class GetBadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignment
        fields= '__all__'
        


class UserwithBadgeSerializer(serializers.ModelSerializer):
    assigned_users = BadgesSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'name', 'email', 'assigned_users']
        

class GetUserDataSerializer( serializers.ModelSerializer):
    class Meta:
        model  = CustomUser
        fields = [
            'username', 'email','password',
        ]
        
class GetUserAll( serializers.ModelSerializer):
    class Meta:
        model  =CustomUser
        fields = '__all__'
        
        
        
class UpdateUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
        
    class Meta:
        model = CustomUser
        fields = ["email", "username", "password", "confirm_password" ,'contact_info','name' ,'organisation', 'organisation_domain','organisation_size','badges_and_types']
   
    

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name']
     
class AllBadgesSerializer(serializers.ModelSerializer):
    badge_id = serializers.IntegerField(source='badge_id.id') 
    name = serializers.CharField(source='badge_id.name')
    description = serializers.CharField(source='badge_id.description')
    criteria = serializers.CharField(source='badge_id.criteria')
    image_url = serializers.ImageField(source='badge_id.image_url', read_only=True)  
    date_created = serializers.DateField(source='badge_id.date_created', read_only=True)
    expiration_durations = serializers.IntegerField(source='badge_id.expiration_durations')
    assigned_users = CustomUserSerializer(many=True, read_only=True, source='badge_id.assigned_users')

    class Meta:
        model = Badge_Assignment
        fields = ['id', 'badge_id', 'name', 'description', 'criteria', 'image_url', 'date_created', 'expiration_durations','assigned_users']
   
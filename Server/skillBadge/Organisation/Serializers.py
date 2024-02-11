from rest_framework import serializers
from .models import *
from Authencation.models import CustomUser

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = ['id','name','description','criteria','image_url','date_created','expiration_durations','org_id']    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  CustomUser
        fields = ['id','name','username','email']  
        
class Issuer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            
            'organisation',
            'organisation_domain',
            'organisation_size',
            'badges_and_types',
            
        ]
        
class BadgeAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignment
        fields = '__all__'          

class GetBadgesSerializer(serializers.ModelSerializer): 
    assigned_users = UserSerializer(many=True)
    class Meta:
        model = Badges
        fields = ['id','org_id','name','description','criteria','image_url','date_created','expiration_durations','assigned_users']
    
class Apply_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            
            'organisation',
            'organisation_domain',
            'organisation_size',
            'badges_and_types',
            
            
        ]
        
        def update(self, instance, validated_data):
        # Handle 'documents' separately if it exists in validated_data
            documents = validated_data.pop('documents', None)
            if documents_file:
                instance.documents = documents_file  # Assuming 'documents' is a FileField in your model

            return super().update(instance, validated_data)
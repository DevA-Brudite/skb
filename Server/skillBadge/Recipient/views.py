from Recipient.Serializers import GetBadgesSerializer

from Organisation.models import Badge_Assignment
from Organisation.models import Badges
from Organisation.Serializers import BadgesSerializer
from Organisation.Serializers import BadgeAssignmentSerializer

from Recipient.Serializers import UserwithBadgeSerializer

from Authencation.models import CustomUser
from Authencation.serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from Recipient.Serializers import GetUserDataSerializer,UpdateUserSerializer,AllBadgesSerializer

from django.shortcuts import render,get_list_or_404,get_object_or_404


from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from Recipient.Serializers import GetUserAll

class GetBadgesView(APIView):
    def get( self, request):
        try:
            badge =Badge_Assignment.objects.all()
            if badge:
                serial = GetBadgesSerializer(badge,many=True)
                return Response( {"data":serial.data})
            else:
                return Response({'error':'badge is not assigned'})
        except:
            serial = GetBadgesSerializer
            return Response( {"error":str(serial.error)})
        

class GetbyidDetail(APIView):
    def get( self, request, user_id):
        try:
            badge = Badge_Assignment.objects.filter(recipient = user_id)
            serial =  BadgeAssignmentSerializer(badge,many=True)
            
            return Response({"data":serial.data})
        except:
            return Response({"error":"error in giving the data"})
                 
class GetUser(APIView):
    
    
    # @permission_classes([IsAuthenticated])
    # @authentication_classes([TokenAuthentication])
    def get(self, request):
        user = CustomUser.objects.all()
        serializer = GetUserAll(user,many=True) 
        
        return Response({"user":serializer.data})
    
   
   

class AllUsers(APIView):
    def get(self, request ):
        try:
            # Retrieve all user instances from the database
            users = request.user
        
            # Serialize the user instances
            serializer = UpdateUserSerializer(users)

            # Return the serialized data in the response
            return Response({"data": serializer.data})

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    
    
class UserUpdate(APIView):

    def patch(self, request):
        try:
            user = request.user
            serializer = UpdateUserSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                user.refresh_from_db()

                return Response(
                    {
                        "data": UpdateUserSerializer(instance=user).data,
                        "status": True,
                        "status_code": 200,
                        "message": "Profile information updated successfully",
                    }
                )
            else:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Cannot update profile information",
                        "error": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class AllBadges(APIView):
    
    serializer_class = AllBadgesSerializer

    def get(self, request):
        try:
            user = request.user  
            badge_assignments = Badge_Assignment.objects.filter(recipient=user)
            
            serializer = self.serializer_class(badge_assignments,many =True)
            # serializer = BadgesSerializer(badge_assignments)
            print(serializer.data)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        



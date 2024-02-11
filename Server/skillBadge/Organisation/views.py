# badge_assignment/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Badge_Assignment, Badges
from .Serializers import *
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from Authencation.models import CustomUser
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from Authencation.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from Utils.views import get_user
from Utils.sendMail import send_custom_email

class BadgeAssignmentAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
   
    def post(self, request):
        try:
            user = request.user
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            badge_assigned = Badge_Assignment.objects.filter(
            badge_id=request.data.get("badge_id"), recipient_id=request.data.get("recipient")
            )
            if badge_assigned:
                return Response(
                    {"msg": "Badge is already assigned to the user"},
                    status=status.HTTP_409_CONFLICT,
                )

            serializer = BadgeAssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                recipient = CustomUser.objects.get(pk=serializer.data.get("recipient"))
                user = UserSerializer(recipient)
                print(user.data)
                context = {"subject":f"Congratulation {user.data.get('name')}! You have earned a new Badge.",
                       "context_data":f"Dear {user.data.get('name')},<br> You have successfully earned a new badge.<br> You can verify the badge from the link below.<br> http://localhost:3000/verify-badge/{serializer.data.get('verification_code')}"}
                send_custom_email(user.data.get("email"),context)
                return Response({"data": serializer.data,"assigned-to":user.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class BadgeDetailsAPIView(APIView):
    # create a badge    
  
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = request.user
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            print(request.user.id,request.user.email)
            data = request.data
            data["org_id"]=request.user.id
            print(data)
            serial = BadgesSerializer(data=data)
            if serial.is_valid():
                serial.save()
                context = {"subject":f"Badge Creation Successfull!",
                       "context_data":f"Dear {request.user.name},<br> you have created a new badge under your Organisation.<br><hr> <h2>Badge Details</h2> Badge Name : {serial.data.get('name')}<br> Badge Description : {serial.data.get('description')}<br> Badge Criteria : {serial.data.get('criteria')}<br>Date of Creation : {serial.data.get('date_created')}<br> Badge Validity : {serial.data.get('expiration_durations')} Days<br>"
                       }
                send_custom_email(request.user.email,context)
                return Response({"data": serial.data}, status=status.HTTP_201_CREATED)
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # fetch badge data with the users it is assigned to
    def get(self, request):
        try:
            user = request.user
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            user = get_user(request)
            print(user)
            badge_id = request.query_params.get("badge_id")
            if badge_id:
                valid_badge = Badges.objects.get(pk=badge_id)
                if valid_badge:
                    Badgeserializer = GetBadgesSerializer(valid_badge)
                    return Response(
                        {"data": Badgeserializer.data},
                        status=status.HTTP_200_OK,
                    )
                return Response(
                    {"msg": "Not a valid badge"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            all_badges = Badges.objects.all()
            serializer = GetBadgesSerializer(all_badges, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # delete a badge
    def delete(self, request):
        try:
            user = request.user
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            badge_id = request.query_params.get("badge_id")
            if badge_id:
                badge_to_delete = Badges.objects.get(pk=badge_id)
                badge_to_delete.delete()
                return Response({"msg": "Badge Deleted"}, status=status.HTTP_200_OK)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # update a badge
    def put(self, request):
        try:
            user = request.user
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            data = request.data
            badge_id = request.query_params.get("badge_id")
            existing_badge = Badges.objects.get(pk=badge_id)
            serial = BadgesSerializer(existing_badge, data=data)
            
            if serial.is_valid():
                serial.save()
                return Response({"data": serial.data}, status=status.HTTP_200_OK)
            return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
# class fetchUserDetailsAPIView(APIView):
#     def get(self,request):
#         recipient_id = request.query_params.get("recipient_id")
#         if recipient_id:
#             assigned_badges = Badge_Assignments.objects.get(pk=recipient_id)
#             serializer = BadgeAssignmentSerializer(assigned_badges, many=True)
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         assigned_users = Badge_Assignments.


        
class EditIssuerDetails(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    def get(self, request, id=None):
        try:
            user = request.user
            user_id = request.user.id
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            print(request.user.name)
            if user_id:
                issuer = get_object_or_404(CustomUser, id=user_id)
                serializer = Issuer_Serializer(instance=issuer)
                return Response({"data": serializer.data})

            else:
                return Response(request, self.issuer_detail, {'form': None, 'issuer': None})

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "Issuer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request, id=None):
        try:
            user = request.user
        #issuer = get_object_or_404(CustomUser, id=id)
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = Issuer_Serializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "data": serializer.data,
                        "status": True,
                        "status_code": 201,
                        "message": "Successfully Changed",
                    }
                )
            else:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Cannot Register",
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
       
       
class ApplyOrg(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    

    def patch(self, request):
        try:
            user = request.user
            

            # issuer = get_object_or_404(CustomUser, id=id)
            print(request.data)
            serializer = Apply_Serializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                user.refresh_from_db()
                return Response(
                    {
                        "data": serializer.data,
                        "status": True,
                        "status_code": 201,
                        "message": "Successfully Registered",
                    }
                )
            else:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Cannot Register",
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
       



class DeleteIssuerDetails(APIView):
    def patch(self, request, id=None):
        try:
            if not user.is_org:
                return Response(
                    {  
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            issuer = get_object_or_404(CustomUser, id=id)
            serializer = Issuer_Serializer(instance=issuer, data=request.data, partial=True)

            for field in serializer.fields:
                if field in request.data:
                    request.data[field] = None

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "data": serializer.data,
                    "status": True,
                    "status_code": 200,
                    "message": "Successfully updated",
                })
            else:
                return Response({
                    "status": False,
                    "status_code": 400,
                    "message": "Cannot update",
                    "error": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "Issuer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class VerifyBadgeAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            uvc = request.query_params.get("uvc")
            verified_badge = Badge_Assignment.objects.get(verification_code=uvc)
            view_badge = BadgeAssignmentSerializer(verified_badge)  
            if view_badge:
                badge_data = Badges.objects.get(pk=view_badge.data.get("badge_id"))
                badge = BadgesSerializer(badge_data)
                recipient_data = CustomUser.objects.get(pk=view_badge.data.get("recipient"))
                recipient = UserSerializer(recipient_data)
                org_data = CustomUser.objects.get(pk=badge.data.get("org_id"))
                org = UserSerializer(org_data)
                return Response(
                    {"msg":"Badge Verified",
                     "assignment_data":view_badge.data,
                     "badge_data":badge.data,
                     "org_data":org.data,
                     "user_data":recipient.data,
                     "verified":True},
                     status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message":"Not a Valid Badge Assignment","error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_404_NOT_FOUND,
            )
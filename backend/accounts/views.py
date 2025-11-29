from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer
from .models import User


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=201)

        print("SIGNUP ERRORS:", serializer.errors)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                },
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                }
            })

        return Response({"error": "Invalid credentials"}, status=400)

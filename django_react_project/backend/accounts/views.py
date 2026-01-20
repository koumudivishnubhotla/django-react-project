from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.core.mail import send_mail
import re
from django.contrib.auth.models import User

def is_strong_password(password):
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[0-9]", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if user already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=400)

    # Strong password rules
    if not re.search(r'[A-Z]', password):
        return Response({'error': 'Password must contain at least one capital letter'}, status=400)

    if not re.search(r'[0-9]', password):
        return Response({'error': 'Password must contain at least one number'}, status=400)

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return Response({'error': 'Password must contain at least one special character'}, status=400)

    # Create user
    User.objects.create_user(username=username, password=password)

    return Response({'message': 'Signup successful'})

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        # SEND WELCOME EMAIL
        send_mail(
            subject='Welcome to Teckost',
            message='Hello! You have successfully logged in to Teckost.',
            from_email='koumudivishnubhotla@gmail.com',
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({'message': 'Login successful'})
    
    return Response({'error': 'Invalid credentials'}, status=400)

@csrf_exempt
def update_profile(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")

        user = User.objects.get(username=username)
        user.email = email
        user.save()

        return JsonResponse({"message": "Profile updated successfully"})
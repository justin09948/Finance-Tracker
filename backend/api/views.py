from rest_framework.views import APIView #To build the API view to handle requests
from rest_framework.response import Response #To send back a response to the frontend
from .serializers import UserSerializers, IncomeSerializer, ExpensesSerializer #Serializer that I made to convert User data(Username, Password) into JSON.
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Income, Expenses

class RegistrationView(APIView):
    permission_classes = [AllowAny]
    serializer_obj = UserSerializers
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username and not password:
            return Response({"Error:Username and Password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username = username).exists():
            return Response({"Error:Username already exists."}, status=status.HTTP_400_BAD_REQUEST)


        serializer = self.serializer_obj(data = {"username":username, "password": password})

        if serializer.is_valid():
            user = serializer.save()

            return Response(UserSerializers(user).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class IncomeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_obj = IncomeSerializer
    def post(self, request):
        serializer = self.serializer_obj(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("Error serializer", status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        income = Income.objects.filter(user = request.user).first()
        if not income:
            return Response("Error, user instance does not exists", status=status.HTTP_400_BAD_REQUEST)
        
        income.delete()
        return(Response("Success, user instance deleted", status=status.HTTP_200_OK))

    def get(self, request, id):
        try:
            income = Income.objects.get(user = id)
        except Income.DoesNotExist:
            return Response("Error, user does not exists", status=status.HTTP_400_BAD_REQUEST)
        serializer = IncomeSerializer(income)
        return Response(serializer.data)

class getIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializers(user)
        return(Response(serializer.data))
    

class ExpensesView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpensesSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        expenses = Expenses.objects.filter(user = request.user)
        serializer = self.serializer_class(expenses, many = True)
        return (Response(serializer.data))
    
    def delete(self, request, id):
        expenses = Expenses.objects.get(id = id)
        if not expenses:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        expenses.delete()
        return Response(status=status.HTTP_200_OK) 
    

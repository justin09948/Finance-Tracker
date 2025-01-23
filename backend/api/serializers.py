from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Income, Expenses

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username", "password"]
        extra_kwargs = {
            'password': {'write_only': True} 
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ["user", "income"]

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = ["id", "user", "amount", "name", "date", "category"]
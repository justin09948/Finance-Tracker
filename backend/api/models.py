from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.core.validators import MinValueValidator

# Create your models here.

class Income(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    income = models.CharField(max_length=100)
    #created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.id

class Expenses(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100)
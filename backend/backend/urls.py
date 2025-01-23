from django.contrib import admin
from django.urls import path
from api.views import RegistrationView, IncomeView, getIdView, ExpensesView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegistrationView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="retrieve_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh_token"),
    path('api/income/', IncomeView.as_view(), name = "income"),
    path('api/income/<int:id>/', IncomeView.as_view(), name = "income_get"),
    path('api/getId/', getIdView.as_view(), name="get_id"),
    path('api/expenses/', ExpensesView.as_view(), name="expenses"),
    path('api/expenses/<int:id>/', ExpensesView.as_view(), name='expense_delete')
]

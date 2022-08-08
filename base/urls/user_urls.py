from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.get_users, name="users"),
    # Auth
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
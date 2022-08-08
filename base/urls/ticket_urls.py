from django.urls import path
from base.views import ticket_views as views

urlpatterns = [
    path('proyectos/', views.get_proyectos, name="proyectos"),
    path('add/', views.TicketCreateView.as_view(), name="ticket_add"),
    path('list/', views.TicketListView.as_view(), name="ticket_list"),


]
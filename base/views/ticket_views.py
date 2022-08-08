from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from base.serializers import ProyectoSerializer, TicketSerializer
from base.models import Proyecto, Ticket
from rest_framework import status, filters
import django_filters.rest_framework
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_proyectos(request):
    proyectos = Proyecto.objects.filter(activo=True)
    serializer = ProyectoSerializer(proyectos, many=True)
    return Response(serializer.data)


class TicketCreateView(CreateAPIView):
    serializer_class = TicketSerializer
    ordering_fields = ['id']
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = TicketSerializer(data=request.data)

        if serializer.is_valid():
           # proyecto = Proyecto.objects.filter(pk=request.data['proyecto_id']).first()

            #serializer.validated_data['proyecto'] = proyecto
            serializer.validated_data['creado_por'] = request.user
            ticket = serializer.save()
            serializer = TicketSerializer(ticket)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('lastPage', self.page.paginator.count),
            ('countItemsOnPage', self.page_size),
            ('current', self.page.number),
            ('num_pages', self.page.paginator.num_pages),

            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))


class TicketListView(ListAPIView):
    serializer_class = TicketSerializer
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter)
    ordering_fields = ['id']
    permission_classes = [IsAuthenticated]
    filter_fields = ('titulo', 'descripcion', 'usuario_asignado', 'estado')
    search_fields = ('titulo', 'descripcion',  'estado',)
    queryset = Ticket.objects.all()
    pagination_class = LargeResultsSetPagination

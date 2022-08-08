from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Proyecto, Ticket, User



class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ['titulo', 'descripcion', 'id']


class TicketSerializer(serializers.ModelSerializer):
    usuario_asignado = serializers.SerializerMethodField(read_only=True)
    proyecto = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Ticket
        fields = ['id','titulo', 'descripcion', 'estado',
                  'usuario_asignado', 'proyecto', 'fecha_creacion']

    def get_usuario_asignado(self, obj):
        if obj.usuario_asignado:
            user = User.objects.filter(pk=obj.usuario_asignado.pk)
            if user:
                user = user[0].username
            return user

    def get_proyecto(self, obj):
        if obj.proyecto:
            proyecto = Proyecto.objects.filter(pk=obj.proyecto.pk)
            if proyecto:
                proyecto = proyecto[0].titulo
            return proyecto


class UserSerializer(serializers.ModelSerializer):
    nombre = serializers.SerializerMethodField(read_only=True)
    apellido = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'nombre', 'apellido', 'username', 'email',
                  'is_staff', 'imagen', 'is_active', 'is_superuser']

    def get_nombre(self, obj):

        nombre = obj.first_name
        if nombre == '':
            nombre = obj.email
        return nombre

    def get_apellido(self, obj):

        apellido = obj.last_name
        if apellido == '':
            apellido = ''
        return apellido


class UserSerializerWithToken(UserSerializer):
    """Esta clase extiende al usuario y le agrega el access token
    """
    token = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        """
         Obtiene el token para el usuario con el metodo importado de jwt for_user()
        :param obj: User
        :return: Un token de acceso
        """
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    class Meta:
        model = User
        fields = ['id', 'nombre', 'apellido', 'username', 'email', 'is_staff',
                  'imagen', 'token', 'is_active', 'is_superuser']

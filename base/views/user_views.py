from abc import ABC

from base.serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer ):

    def validate(self, attrs):
        """
        Con esta funcion se pasan los datos
        directamente al frontend.
        sin tener que decodificar
        """
        data = super().validate(attrs)

        # Agrega todos los campos de la clase UserSerializerWithToken
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class Login(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    User = get_user_model()
    users = User.objects.filter(is_active=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class RefreshTokenSerializer(serializers.Serializer ):
    """ Metodo para enviar el token a blacklist
        para hacer logout en el backend
     """
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is invalid or expired')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')


class LogoutView(GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_imagen_user(request):
    data =request.data
    User = get_user_model()

    try:
        user_id = data['id']

        user = User.objects.get(id=user_id)
        user.imagen = request.FILES.get('imagen')
        user.save()
        return Response({'message': 'Imagen cargada con exito'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Hubo un error: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

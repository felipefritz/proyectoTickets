from django.db import models
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords


class User(AbstractUser):
    imagen = models.ImageField(upload_to='users', blank=True, null=True)

    def __str__(self):
        return f'{self.username}'


class BaseModel(models.Model):
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True, blank=True, null=True)
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    actualizado_por = models.IntegerField(blank=True, null=True)

    class Meta:
        abstract = True


class Proyecto(BaseModel):
    titulo = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.titulo}'


class Ticket(BaseModel):
    ESTADOS = [
        ('Abierto', 'Abierto'),
        ('Pendiente', 'Pendiente'),
        ('En proceso', 'En proceso'),
        ('Resuelto', 'Resuelto'),
        ('Cerrado', 'Cerrado'),
    ]
    titulo = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=15, default='Abierto',
                              choices=ESTADOS, null=True, blank=True)
    usuario_asignado = models.ForeignKey(User, related_name='usuario_asignado', blank=True, null=True,
                                         on_delete=models.CASCADE)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()
    def __str__(self):
        return f'{self.titulo} / {self.proyecto}'


from simple_history.admin import SimpleHistoryAdmin
from django.contrib import admin
from django.contrib.auth import get_user_model
from base.models import Ticket, Proyecto, User
from django.contrib.auth.admin import UserAdmin
from simple_history.utils import update_change_reason

admin.site.register(User, UserAdmin)
admin.site.site_header = 'Administracion de Tickets'
admin.site.site_title = 'Administracion de Tickets'


class TicketAdmin(SimpleHistoryAdmin):
    list_display = ['titulo', 'descripcion',
                    'estado', 'usuario_asignado', 'proyecto', 'activo']
    list_filter = ['estado', 'usuario_asignado']
    search_fields = ['titulo', 'estado', 'usuario_asignado']
    exclude = ['creado_por', 'actualizado_por']
    list_per_page = 10
    readonly_fields = ['creado_por', 'get_actualizado_por',
                       'fecha_creacion', 'fecha_actualizacion']
    list_editable = ['activo', 'estado']
    history_list_display = ["estado"]

    def save_model(self, request, obj, form, change):
        if obj.pk is None:
            obj.creado_por = request.user

        else:
            obj.actualizado_por = request.user.pk

        update_change_reason(obj, 'Add a question')

        obj.save()

    def get_actualizado_por(self, obj):
        user = User.objects.get(pk=obj.actualizado_por)
        return user.first_name


class ProyectoAdmin(admin.ModelAdmin):
    readonly_fields = ['creado_por', 'actualizado_por',
                       'fecha_creacion', 'fecha_actualizacion']

    list_display = ['titulo', 'descripcion', 'activo']
    list_filter = ['titulo']
    search_fields = ['titulo', 'descripcion']
    exclude = ['creado_por', 'actualizado_por']
    list_editable = ['activo']

    def save_model(self, request, obj, form, change):
        if obj.pk is None:
            obj.creado_por = request.user
        else:
            obj.actualizado_por = request.user.pk

        obj.save()


admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(Ticket, TicketAdmin)

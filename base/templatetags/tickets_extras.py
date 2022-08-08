from django import template
from base.models import Ticket

register = template.Library()

@register.filter
def count_tickets():
    return Ticket.objects.filter(activo=True).count()

 
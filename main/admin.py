from django.contrib import admin
from main.models import Object, Case


# Register your models here.

@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_thumb','case']
    readonly_fields = ('image_tag',)
    


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

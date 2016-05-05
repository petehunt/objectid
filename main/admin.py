from django.contrib import admin
from main.models import Object, Case, Vote


# Register your models here.
class VoteInline(admin.TabularInline):
    model = Vote


@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_thumb','case','vote_count']
    readonly_fields = ('image_tag',)
    inlines = [VoteInline,]


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']



@admin.register(Vote)
class CaseAdmin(admin.ModelAdmin):
    list_display = ['created', 'object', 'user', 'body']

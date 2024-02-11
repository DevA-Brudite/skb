from django.contrib import admin
from Organisation.models import *
# Register your models here.
class BadgesAdmin(admin.ModelAdmin):
    list_display=("name","description","criteria","image_url","date_created","expiration_durations")

class Badge_AssignmentsAdmin(admin.ModelAdmin):
    list_display=("badge_id","unique_verification_code")
    

admin.site.register(Badges,BadgesAdmin)
admin.site.register(Badge_Assignment)
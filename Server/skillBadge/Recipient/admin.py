from django.contrib import admin
from Recipient.models import *

class RecipientsAdmin(admin.ModelAdmin):
    list_display=("name","email")
class RecipientsAdmin(admin.ModelAdmin):
    list_display=("name","email")
    

admin.site.register(Recipients,RecipientsAdmin)    

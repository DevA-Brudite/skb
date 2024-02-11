import uuid
from django.db import models
from datetime import datetime
from Recipient.models import *
from Authencation.models import *
from datetime import datetime
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Badges(models.Model):
    name=models.CharField(max_length=10,default='')
    description=models.TextField(max_length=1000,default='')
    criteria=models.CharField(max_length=10,default='')
    image_url = models.ImageField(upload_to='images',default='',null=True, blank=True)
    assigned_users = models.ManyToManyField(CustomUser,through="Badge_Assignment",related_name="assigned_users")
    org_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True)
    date_created=models.DateField(default=datetime.now().date(),null=True,blank=True)
    expiration_durations = models.IntegerField(default=0)
    pdf_file = models.FileField(upload_to='pdfs/',null=True,blank=True)
    
class Badge_Assignment(models.Model):
    badge_id = models.ForeignKey(Badges,on_delete=models.CASCADE)
    recipient=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    verification_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    
    def __str__(self):
        return self.recipient.username
    

from django.db import models

# Create your models here.
class Recipients(models.Model):
    name = models.CharField(max_length=10,default='')
    email=models.EmailField(max_length=50,default='')  
    


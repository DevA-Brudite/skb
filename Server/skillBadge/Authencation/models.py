from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, name, contact_info, password=None, is_org=False, **extra_fields):
        if not username:
            raise ValueError("Username must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, name=name, contact_info=contact_info, is_org=is_org, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, username, name, contact_info, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, name, contact_info, password, is_org=True, **extra_fields)
class CustomUser(AbstractBaseUser,PermissionsMixin):

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique = True)
    name = models.CharField(max_length=255)
    is_org = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    name = models.CharField(max_length=100, null=True, blank=True)
    contact_info = PhoneNumberField(blank=True, null=True)
    organisation = models.CharField(max_length=100, null=True, blank=True)
    organisation_domain = models.CharField(max_length=100, null=True, blank=True)
    organisation_size = models.IntegerField(null=True, blank=True)
    badges_and_types = models.TextField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    documents = models.FileField(upload_to='images/',null=True,blank=True)
    
    



    def str(self):
        return self.username


    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','contact_info','name']

    def str(self):
        return self.username 
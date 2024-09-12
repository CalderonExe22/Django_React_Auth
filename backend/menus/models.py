from django.db import models
from accounts.models import Rol
# Create your models here.

class Menu(models.Model):
    nombre = models.CharField(max_length=100)
    url = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nombre

class MenuRol(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.menu.nombre}-{self.rol.nombre}'
    
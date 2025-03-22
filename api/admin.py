from django.contrib import admin
from .models import MyUser, LegoSet, Comment

# Register your models here.
admin.site.register(MyUser)
admin.site.register(LegoSet)
admin.site.register(Comment)
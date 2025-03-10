from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
#user model
class MyUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    bio = models.CharField(max_length=400)
    profile_img = models.ImageField(upload_to='profile_img/', blank=True, null=True)
    likes = models.ManyToManyField('LegoSet', related_name='liked_by', blank=True)
    saves = models.ManyToManyField('LegoSet', related_name='saved_by', blank=True)

    def __str__(self):
        return self.username

#lego set model
class LegoSet(models.Model):
    name = models.CharField(max_length=200)
    set_num = models.CharField(max_length=50, unique=True)
    pieces = models.IntegerField()
    img_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

#comment model    
class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='comments')
    lego_set = models.ForeignKey(LegoSet, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} commented on {self.lego_set.name}'

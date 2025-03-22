from dataclasses import fields
from os import write
from pyexpat import model
from rest_framework import serializers
from .models import LegoSet, MyUser, LegoSet, Comment

#user serializer
class MyUserProfileSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    saves = serializers.SerializerMethodField()

    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'profile_img', 'likes', 'saves', 'first_name']

    def get_likes(self, obj):
        return LegoSetSerializer(obj.likes.all(), many=True).data
    
    def get_saves(self, obj):
        return LegoSetSerializer(obj.saves.all(), many=True).data

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = MyUser(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


#lego set serializer
class LegoSetSerializer(serializers.ModelSerializer):
    liked_by = serializers.StringRelatedField(many=True)
    saved_by = serializers.StringRelatedField(many=True)

    class Meta:
        model = LegoSet
        fields = ['name', 'set_num', 'pieces', 'img_url', 'liked_by', 'saved_by']

#comment serializer
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    lego_set = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'username', 'lego_set', 'content', 'formatted_date']
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_lego_set(self, obj):
        return obj.lego_set.name

    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%b %d %y")
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'email', 'profile_img', 'first_name', 'last_name']
    

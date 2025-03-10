from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import LegoSet, MyUser, LegoSet, Comment

#user serializer
class MyUserProfileSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    saves = serializers.SerializerMethodField()

    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'profile_img', 'likes', 'saves']

    def get_likes(self, obj):
        return LegoSetSerializer(obj.likes.all(), many=True).data
    
    def get_saves(self, obj):
        return LegoSetSerializer(obj.saves.all(), many=True).data

#comment serializer
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ['user', 'content', 'created_at']

#lego set serializer
class LegoSetSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    liked_by = serializers.StringRelatedField(many=True)
    saved_by = serializers.StringRelatedField(many=True)

    class Meta:
        model = LegoSet
        fields = ['name', 'set_num', 'pieces', 'img_url', 'comments', 'liked_by', 'saved_by']
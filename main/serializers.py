from django.contrib.auth.models import User, Group
from models import Object, Vote
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class ObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Object
        fields = ('id','url', 'question',)
        

class VoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
 
    class Meta:
        model = Vote
        fields = ('user','object','body',)
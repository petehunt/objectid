from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from main.models import Object, Vote
from django.contrib.auth.models import User, Group

# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework import generics


#quiz mode

@login_required
def index(request, object_id):

    object = Object.objects.get(pk=object_id)
    object_url = object.url
    object_question = object.question
    
    c = {
        'object': object,
        'object_id': object_id,
        'object_url': object_url,
        'object_question': object_question,
        'user':request.user,
        'request':request,
    }
    return render_to_response('index.html', context=c)



from rest_framework import viewsets
from serializers import UserSerializer, GroupSerializer, ObjectSerializer, VoteSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


    
class VoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that accepts votes.
    """
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


class ObjectList(generics.ListAPIView):
    """
    API endpoint that returns eligible objects for a user.
    """
    serializer_class = ObjectSerializer
    
    # returns objects for which user has not voted
    def get_queryset(self):
        user = self.request.user
        return Object.objects.exclude(vote__user=user)
    

class ObjectDetail(generics.RetrieveAPIView):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer



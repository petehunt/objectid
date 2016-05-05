from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from main.models import Object
from django.contrib.auth.models import User, Group

# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext

@login_required
def index(request, object_id):

    object = Object.objects.get(pk=object_id)
    object_url = object.url
    
    c = {
        'object': object,
        'object_id': object_id,
        'object_url': object_url,

    }
    return render_to_response('index.html', context=c)



from rest_framework import viewsets
from serializers import UserSerializer, GroupSerializer, ObjectSerializer

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


class ObjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Object.objects.all() #update to include only eligible items without a vote
    serializer_class = ObjectSerializer

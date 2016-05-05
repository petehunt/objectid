from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Case(models.Model):
    name = models.TextField(max_length=300)
    def __unicode__(self):
        return u'%s' % (self.name)
    

class Object(models.Model):
    url = models.URLField(max_length=300)
    case = models.ForeignKey(Case, default=1, null=True, blank=True)
    question = models.TextField(max_length=300, default='', blank=True)    
    def __unicode__(self):
        return u'%s' % (self.url)
    
       
    def image_tag(self):
        return u'<img src="%s" />' % self.url

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

        
    def image_thumb(self):
        return u'<img src="%s" width="100"/>' % self.url
        
    image_thumb.short_description = 'Thumbnail'
    image_thumb.allow_tags = True
    
    
class Vote(models.Model):
    user = models.ForeignKey(User)
    object = models.ForeignKey(Object)
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=100)
    def __unicode__(self):
        return u'%s' % (self.created)


#DONE
## Django REST API Endpoints for votes (yes/no)
## Upload to Github repo
## Vote object
## Serve users only things they haven't seen before


#NOTDOING
## django comments


#TODOS


## Enable Case-level access control -- cases get groups, groups can see items
## Enable certain cases to have multiple votes from the same person? Probably easier to have a list of voted stuff in case you want to review it and do it again

## Enable commenting quick & dirty

## Upload to webserver


## gamification: give users points based on how many they have said yes/no to
## Don't make users look through a comment thread

## Deep vs. shallow investigation
## iteration?

## referral? 



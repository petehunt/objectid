from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User, Group

# Create your models here.

class Case(models.Model):
    name = models.TextField(max_length=300)
    eligible_group = models.ForeignKey(Group, default=1)

    def __unicode__(self):
        return u'%s' % (self.name)
    

class Object(models.Model):
    url = models.URLField(max_length=300)
    case = models.ForeignKey(Case, default=1, null=True, blank=True)
    question = models.TextField(max_length=300, default='Can you recognize anything in this image?', blank=True)    
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
    
    
    def vote_count(self):
        return Vote.objects.filter(object=self).count()
    
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

## Email investigators when they have new cases
## Signup flows?
## Enable Case-level access control -- cases get groups, groups can see items
## Enable certain cases to have multiple votes from the same person? Probably easier to have a list of voted stuff in case you want to review it and do it again.
## gamification: give users points based on how many they have said yes/no to

## Enable commenting quick & dirty
## Upload to webserver

## Don't make users look through a comment thread

## Image annotator

#Questions:
## What works best to drive engagement & results? Deep vs. shallow investigation on each image?
## How can we do iteration correctly?
## How can we do referral correctly/securely? 



# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-04 22:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_case'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='name',
            field=models.TextField(default='case', max_length=300),
            preserve_default=False,
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-05 04:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20160505_0403'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='question',
            field=models.TextField(blank=True, default='', max_length=300),
        ),
    ]

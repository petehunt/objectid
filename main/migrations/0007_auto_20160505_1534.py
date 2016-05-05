# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-05 15:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
        ('main', '0006_auto_20160505_0414'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='eligible_group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='auth.Group'),
        ),
        migrations.AlterField(
            model_name='object',
            name='question',
            field=models.TextField(blank=True, default='Can you recognize anything in this image?', max_length=300),
        ),
    ]

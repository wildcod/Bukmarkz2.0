# Generated by Django 3.1.12 on 2021-06-14 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('import', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookmark',
            name='author',
        ),
    ]

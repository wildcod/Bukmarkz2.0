# Generated by Django 3.1.11 on 2022-07-24 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(default=True, max_length=50),
            preserve_default=False,
        ),
    ]

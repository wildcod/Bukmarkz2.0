# Generated by Django 3.1.11 on 2021-10-14 18:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bookmarks', '0001_initial'),
        ('import', '0002_remove_bookmark_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookmark',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='bookmarks.category'),
        ),
        migrations.DeleteModel(
            name='CategoryDashboard',
        ),
    ]

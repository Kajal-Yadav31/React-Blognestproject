# Generated by Django 5.2 on 2025-07-15 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_rename_images_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.FileField(blank=True, default='image/default-user.jpg', null=True, upload_to='image'),
        ),
    ]

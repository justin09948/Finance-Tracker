# Generated by Django 5.1.4 on 2025-01-19 00:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_expenses_total'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expenses',
            name='total',
        ),
    ]

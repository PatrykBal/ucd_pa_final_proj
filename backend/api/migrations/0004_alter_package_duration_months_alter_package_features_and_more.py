# Generated by Django 5.1.4 on 2025-02-07 23:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_serviceprovider_certifications_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='duration_months',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='package',
            name='features',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='packagesubscription',
            name='package',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscriptions', to='api.package'),
        ),
    ]

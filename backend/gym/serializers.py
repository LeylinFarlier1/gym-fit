from rest_framework import serializers
from .models import Miembros

class MiembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Miembros
        fields = '__all__'
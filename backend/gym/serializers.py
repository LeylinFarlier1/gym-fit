from rest_framework import serializers
from .models import Asistencia, Clases, Clientes, Equipos, HorariosClases, HorariosPersonal, Membresias, Pagos, Personal, Productos, Ventas

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'

class ClasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clases
        fields = '__all__'

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'

class EquiposSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipos
        fields = '__all__'

class HorariosClasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorariosClases
        fields = '__all__'

class HorariosPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorariosPersonal
        fields = '__all__'

class MembresiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membresias
        fields = '__all__'

class PagosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields = '__all__'

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = '__all__'

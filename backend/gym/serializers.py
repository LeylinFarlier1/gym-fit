from rest_framework import serializers
from .models import (
    PlanesMembresia, Miembros, SuscripcionesMiembro, RolesPersonal, Personal,
    HorariosPersonal, Clases, ClasesProgramadas, Asistencia, Pagos,
    CategoriasGasto, Gastos, MetasMiembro, LogsEntrenamiento, FeedbackMiembro
)

class PlanesMembresiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanesMembresia
        fields = '__all__'

class MiembrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Miembros
        fields = '__all__'

class SuscripcionesMiembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuscripcionesMiembro
        fields = '__all__'

class RolesPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesPersonal
        fields = '__all__'

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'

class HorariosPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorariosPersonal
        fields = '__all__'

class ClasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clases
        fields = '__all__'

class ClasesProgramadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClasesProgramadas
        fields = '__all__'

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'

class PagosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields = '__all__'

class CategoriasGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriasGasto
        fields = '__all__'

class GastosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gastos
        fields = '__all__'

class MetasMiembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetasMiembro
        fields = '__all__'

class LogsEntrenamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogsEntrenamiento
        fields = '__all__'

class FeedbackMiembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackMiembro
        fields = '__all__'

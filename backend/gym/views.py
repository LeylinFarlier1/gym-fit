from rest_framework import viewsets
from .models import (
    PlanesMembresia, Miembros, SuscripcionesMiembro, RolesPersonal, Personal,
    HorariosPersonal, Clases, ClasesProgramadas, Asistencia, Pagos,
    CategoriasGasto, Gastos, MetasMiembro, LogsEntrenamiento, FeedbackMiembro
)
from .serializers import (
    PlanesMembresiaSerializer, MiembroSerializer, SuscripcionesMiembroSerializer,
    RolesPersonalSerializer, PersonalSerializer, HorariosPersonalSerializer,
    ClasesSerializer, ClasesProgramadasSerializer, AsistenciaSerializer,
    PagosSerializer, CategoriasGastoSerializer, GastosSerializer,
    MetasMiembroSerializer, LogsEntrenamientoSerializer, FeedbackMiembroSerializer
)

class PlanesMembresiaViewSet(viewsets.ModelViewSet):
    queryset = PlanesMembresia.objects.all()
    serializer_class = PlanesMembresiaSerializer

class MiembrosViewSet(viewsets.ModelViewSet):
    queryset = Miembros.objects.all()
    serializer_class = MiembroSerializer

class SuscripcionesMiembroViewSet(viewsets.ModelViewSet):
    queryset = SuscripcionesMiembro.objects.all()
    serializer_class = SuscripcionesMiembroSerializer

class RolesPersonalViewSet(viewsets.ModelViewSet):
    queryset = RolesPersonal.objects.all()
    serializer_class = RolesPersonalSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class HorariosPersonalViewSet(viewsets.ModelViewSet):
    queryset = HorariosPersonal.objects.all()
    serializer_class = HorariosPersonalSerializer

class ClasesViewSet(viewsets.ModelViewSet):
    queryset = Clases.objects.all()
    serializer_class = ClasesSerializer

class ClasesProgramadasViewSet(viewsets.ModelViewSet):
    queryset = ClasesProgramadas.objects.all()
    serializer_class = ClasesProgramadasSerializer

class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer

class PagosViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.all()
    serializer_class = PagosSerializer

class CategoriasGastoViewSet(viewsets.ModelViewSet):
    queryset = CategoriasGasto.objects.all()
    serializer_class = CategoriasGastoSerializer

class GastosViewSet(viewsets.ModelViewSet):
    queryset = Gastos.objects.all()
    serializer_class = GastosSerializer

class MetasMiembroViewSet(viewsets.ModelViewSet):
    queryset = MetasMiembro.objects.all()
    serializer_class = MetasMiembroSerializer

class LogsEntrenamientoViewSet(viewsets.ModelViewSet):
    queryset = LogsEntrenamiento.objects.all()
    serializer_class = LogsEntrenamientoSerializer

class FeedbackMiembroViewSet(viewsets.ModelViewSet):
    queryset = FeedbackMiembro.objects.all()
    serializer_class = FeedbackMiembroSerializer

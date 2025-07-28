from rest_framework import viewsets
from .models import Asistencia, Clases, Clientes, Equipos, HorariosClases, HorariosPersonal, Membresias, Pagos, Personal, Productos, Ventas
from .serializers import AsistenciaSerializer, ClasesSerializer, ClientesSerializer, EquiposSerializer, HorariosClasesSerializer, HorariosPersonalSerializer, MembresiasSerializer, PagosSerializer, PersonalSerializer, ProductosSerializer, VentasSerializer

class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer

class ClasesViewSet(viewsets.ModelViewSet):
    queryset = Clases.objects.all()
    serializer_class = ClasesSerializer

class ClientesViewSet(viewsets.ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClientesSerializer

class EquiposViewSet(viewsets.ModelViewSet):
    queryset = Equipos.objects.all()
    serializer_class = EquiposSerializer

class HorariosClasesViewSet(viewsets.ModelViewSet):
    queryset = HorariosClases.objects.all()
    serializer_class = HorariosClasesSerializer

class HorariosPersonalViewSet(viewsets.ModelViewSet):
    queryset = HorariosPersonal.objects.all()
    serializer_class = HorariosPersonalSerializer

class MembresiasViewSet(viewsets.ModelViewSet):
    queryset = Membresias.objects.all()
    serializer_class = MembresiasSerializer

class PagosViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.all()
    serializer_class = PagosSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer
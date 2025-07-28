from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PlanesMembresiaViewSet, MiembrosViewSet, SuscripcionesMiembroViewSet,
    RolesPersonalViewSet, PersonalViewSet, HorariosPersonalViewSet,
    ClasesViewSet, ClasesProgramadasViewSet, AsistenciaViewSet,
    PagosViewSet, CategoriasGastoViewSet, GastosViewSet,
    MetasMiembroViewSet, LogsEntrenamientoViewSet, FeedbackMiembroViewSet
)

router = DefaultRouter()
router.register(r'planes-membresia', PlanesMembresiaViewSet)
router.register(r'members', MiembrosViewSet) # Register MiembrosViewSet
router.register(r'suscripciones-miembro', SuscripcionesMiembroViewSet)
router.register(r'roles-personal', RolesPersonalViewSet)
router.register(r'personal', PersonalViewSet)
router.register(r'horarios-personal', HorariosPersonalViewSet)
router.register(r'clases', ClasesViewSet)
router.register(r'clases-programadas', ClasesProgramadasViewSet)
router.register(r'asistencia', AsistenciaViewSet)
router.register(r'pagos', PagosViewSet)
router.register(r'categorias-gasto', CategoriasGastoViewSet)
router.register(r'gastos', GastosViewSet)
router.register(r'metas-miembro', MetasMiembroViewSet)
router.register(r'logs-entrenamiento', LogsEntrenamientoViewSet)
router.register(r'feedback-miembro', FeedbackMiembroViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

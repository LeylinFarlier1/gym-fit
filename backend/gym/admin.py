from django.contrib import admin
from .models import (
    PlanesMembresia, Miembros, SuscripcionesMiembro,
    RolesPersonal, Personal, HorariosPersonal,
    Clases, ClasesProgramadas, Asistencia,
    Pagos, CategoriasGasto, Gastos,
    MetasMiembro, LogsEntrenamiento, FeedbackMiembro,
    PreferenciasDefault, PreferenciasUsuarioOverride
)

# --- ADMINISTRACIÓN DE MEMBRESÍAS ---
@admin.register(PlanesMembresia)
class PlanesMembresiaAdmin(admin.ModelAdmin):
    list_display = ('nombre_plan', 'tipo_plan', 'precio', 'duracion_dias', 'numero_clases', 'activo')
    list_filter = ('tipo_plan', 'activo')
    search_fields = ('nombre_plan',)

@admin.register(Miembros)
class MiembrosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'email', 'estado', 'fecha_registro')
    list_filter = ('estado', 'fecha_registro')
    search_fields = ('nombre', 'apellido', 'email')
    date_hierarchy = 'fecha_registro'

@admin.register(SuscripcionesMiembro)
class SuscripcionesMiembroAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'plan', 'fecha_inicio', 'fecha_fin', 'estado', 'precio_pagado')
    list_filter = ('estado', 'plan', 'fecha_inicio')
    search_fields = ('miembro__nombre', 'miembro__apellido')

# --- ADMINISTRACIÓN DE PERSONAL ---
@admin.register(RolesPersonal)
class RolesPersonalAdmin(admin.ModelAdmin):
    list_display = ('nombre_rol', 'descripcion_rol')

@admin.register(Personal)
class PersonalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'email', 'rol', 'fecha_contratacion', 'activo')
    list_filter = ('rol', 'activo', 'fecha_contratacion')
    search_fields = ('nombre', 'apellido', 'email')

@admin.register(HorariosPersonal)
class HorariosPersonalAdmin(admin.ModelAdmin):
    list_display = ('personal', 'inicio_turno', 'fin_turno')
    list_filter = ('personal', 'inicio_turno')

# --- ADMINISTRACIÓN DE CLASES ---
@admin.register(Clases)
class ClasesAdmin(admin.ModelAdmin):
    list_display = ('nombre_clase', 'duracion_minutos_default', 'capacidad_maxima_default')
    search_fields = ('nombre_clase',)

@admin.register(ClasesProgramadas)
class ClasesProgramadasAdmin(admin.ModelAdmin):
    list_display = ('clase', 'instructor', 'fecha_hora_inicio', 'fecha_hora_fin', 'estado', 'capacidad_actual')
    list_filter = ('estado', 'clase', 'instructor', 'fecha_hora_inicio')
    date_hierarchy = 'fecha_hora_inicio'

@admin.register(Asistencia)
class AsistenciaAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'clase_programada', 'estado', 'fecha_reserva', 'fecha_check_in')
    list_filter = ('estado', 'fecha_reserva')
    search_fields = ('miembro__nombre', 'miembro__apellido')

# --- ADMINISTRACIÓN FINANCIERA ---
@admin.register(Pagos)
class PagosAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'monto', 'metodo_pago', 'fecha_pago', 'concepto')
    list_filter = ('metodo_pago', 'fecha_pago')
    search_fields = ('miembro__nombre', 'miembro__apellido', 'concepto')
    date_hierarchy = 'fecha_pago'

@admin.register(CategoriasGasto)
class CategoriasGastoAdmin(admin.ModelAdmin):
    list_display = ('nombre_categoria', 'tipo_gasto')
    list_filter = ('tipo_gasto',)

@admin.register(Gastos)
class GastosAdmin(admin.ModelAdmin):
    list_display = ('categoria_gasto', 'monto', 'fecha_gasto', 'proveedor')
    list_filter = ('categoria_gasto', 'fecha_gasto')
    search_fields = ('proveedor', 'descripcion')
    date_hierarchy = 'fecha_gasto'

# --- ADMINISTRACIÓN DE DATOS PARA IA ---
@admin.register(MetasMiembro)
class MetasMiembroAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'tipo_meta', 'valor_objetivo', 'fecha_inicio', 'fecha_objetivo', 'estado_meta')
    list_filter = ('tipo_meta', 'estado_meta', 'fecha_inicio')
    search_fields = ('miembro__nombre', 'miembro__apellido')

@admin.register(LogsEntrenamiento)
class LogsEntrenamientoAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'fecha_ejercicio', 'nombre_ejercicio', 'series', 'repeticiones', 'peso_kg')
    list_filter = ('fecha_ejercicio', 'nombre_ejercicio')
    search_fields = ('miembro__nombre', 'miembro__apellido', 'nombre_ejercicio')
    date_hierarchy = 'fecha_ejercicio'

@admin.register(FeedbackMiembro)
class FeedbackMiembroAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'calificacion', 'instructor', 'fecha_feedback')
    list_filter = ('calificacion', 'instructor', 'fecha_feedback')
    search_fields = ('miembro__nombre', 'miembro__apellido')

# --- ADMINISTRACIÓN DE PREFERENCIAS ---
@admin.register(PreferenciasDefault)
class PreferenciasDefaultAdmin(admin.ModelAdmin):
    list_display = ('nombre_preferencia', 'tipo_dato', 'valor_default')
    search_fields = ('nombre_preferencia',)

@admin.register(PreferenciasUsuarioOverride)
class PreferenciasUsuarioOverrideAdmin(admin.ModelAdmin):
    list_display = ('miembro', 'nombre_preferencia', 'valor_personalizado')
    list_filter = ('nombre_preferencia',)
    search_fields = ('miembro__nombre', 'miembro__apellido')

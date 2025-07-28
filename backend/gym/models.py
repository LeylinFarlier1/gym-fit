from django.db import models

# --- PARTE I & II: ESTRUCTURAS FUNDAMENTALES - MIEMBROS Y SUSCRIPCIONES ---

class PlanesMembresia(models.Model):
    plan_id = models.AutoField(primary_key=True)
    nombre_plan = models.CharField(max_length=150, unique=True, help_text="Nombre único del plan de membresía.")
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, help_text="Precio del plan.")
    duracion_dias = models.IntegerField(blank=True, null=True, help_text="Duración en días para planes de período fijo (ej. 30, 365).")
    numero_clases = models.IntegerField(blank=True, null=True, help_text="Número de clases incluidas para planes tipo bono.")
    
    TIPO_PLAN_CHOICES = [
        ('Solo Pilates', 'Solo Pilates'),
        ('Solo Gimnasio', 'Solo Gimnasio'),
        ('Completo', 'Completo'),
        ('Bono', 'Bono'),
    ]
    tipo_plan = models.CharField(max_length=50, choices=TIPO_PLAN_CHOICES)
    activo = models.BooleanField(default=True, help_text="Indica si el plan está actualmente ofrecido.")

    def __str__(self):
        return self.nombre_plan

class Miembros(models.Model):
    miembro_id = models.AutoField(primary_key=True, help_text="ID único para cada miembro.")
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('congelado', 'Congelado'),
        ('potencial', 'Potencial'),
    ]
    estado = models.CharField(max_length=50, choices=ESTADO_CHOICES, default='potencial')
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    codigo_postal = models.CharField(max_length=20, blank=True, null=True)
    notas_administrativas = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class SuscripcionesMiembro(models.Model):
    suscripcion_id = models.AutoField(primary_key=True)
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    plan = models.ForeignKey(PlanesMembresia, on_delete=models.RESTRICT)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    
    ESTADO_SUSCRIPCION_CHOICES = [
        ('activa', 'Activa'),
        ('vencida', 'Vencida'),
        ('cancelada', 'Cancelada'),
        ('futura', 'Futura'),
    ]
    estado = models.CharField(max_length=50, choices=ESTADO_SUSCRIPCION_CHOICES)
    precio_pagado = models.DecimalField(max_digits=10, decimal_places=2)
    clases_restantes = models.IntegerField(blank=True, null=True, help_text="Créditos restantes para planes tipo bono.")

    def __str__(self):
        return f"{self.miembro} - {self.plan.nombre_plan}"

# --- PARTE III: EXCELENCIA OPERATIVA - PERSONAL, CLASES Y ASISTENCIA ---

class RolesPersonal(models.Model):
    rol_id = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=100, unique=True)
    descripcion_rol = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre_rol

class Personal(models.Model):
    personal_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    fecha_contratacion = models.DateField()
    rol = models.ForeignKey(RolesPersonal, on_delete=models.SET_NULL, null=True, blank=True)
    especialidades = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class HorariosPersonal(models.Model):
    horario_id = models.AutoField(primary_key=True)
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    inicio_turno = models.DateTimeField()
    fin_turno = models.DateTimeField()
    notas = models.TextField(blank=True, null=True)

class Clases(models.Model):
    clase_id = models.AutoField(primary_key=True)
    nombre_clase = models.CharField(max_length=150, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    duracion_minutos_default = models.IntegerField(blank=True, null=True)
    capacidad_maxima_default = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.nombre_clase

class ClasesProgramadas(models.Model):
    clase_programada_id = models.AutoField(primary_key=True)
    clase = models.ForeignKey(Clases, on_delete=models.RESTRICT)
    instructor = models.ForeignKey(Personal, on_delete=models.SET_NULL, blank=True, null=True)
    fecha_hora_inicio = models.DateTimeField()
    fecha_hora_fin = models.DateTimeField()
    sala_o_ubicacion = models.CharField(max_length=100, blank=True, null=True)
    capacidad_actual = models.IntegerField(default=0)
    
    ESTADO_CLASE_CHOICES = [
        ('Programada', 'Programada'),
        ('Completada', 'Completada'),
        ('Cancelada', 'Cancelada'),
    ]
    estado = models.CharField(max_length=50, choices=ESTADO_CLASE_CHOICES, default='Programada')

    def __str__(self):
        return f"{self.clase.nombre_clase} - {self.fecha_hora_inicio.strftime('%Y-%m-%d %H:%M')}"

class Asistencia(models.Model):
    asistencia_id = models.AutoField(primary_key=True)
    clase_programada = models.ForeignKey(ClasesProgramadas, on_delete=models.CASCADE)
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    fecha_check_in = models.DateTimeField(blank=True, null=True)
    
    ESTADO_ASISTENCIA_CHOICES = [
        ('Reservado', 'Reservado'),
        ('Asistió', 'Asistió'),
        ('Canceló', 'Canceló'),
        ('No se presentó', 'No se presentó'),
    ]
    estado = models.CharField(max_length=50, choices=ESTADO_ASISTENCIA_CHOICES, default='Reservado')

    class Meta:
        unique_together = ('clase_programada', 'miembro')

# --- PARTE IV: MOTOR FINANCIERO - INGRESOS Y GASTOS ---

class Pagos(models.Model):
    pago_id = models.AutoField(primary_key=True)
    miembro = models.ForeignKey(Miembros, on_delete=models.SET_NULL, blank=True, null=True)
    suscripcion = models.ForeignKey(SuscripcionesMiembro, on_delete=models.SET_NULL, blank=True, null=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    
    METODO_PAGO_CHOICES = [
        ('Tarjeta de Crédito', 'Tarjeta de Crédito'),
        ('Transferencia', 'Transferencia'),
        ('Efectivo', 'Efectivo'),
        ('Otro', 'Otro'),
    ]
    metodo_pago = models.CharField(max_length=50, choices=METODO_PAGO_CHOICES)
    concepto = models.CharField(max_length=255)
    id_transaccion_externa = models.CharField(max_length=255, blank=True, null=True)

class CategoriasGasto(models.Model):
    categoria_gasto_id = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100, unique=True)
    
    TIPO_GASTO_CHOICES = [
        ('Fijo', 'Fijo'),
        ('Variable', 'Variable'),
    ]
    tipo_gasto = models.CharField(max_length=50, choices=TIPO_GASTO_CHOICES)

    def __str__(self):
        return self.nombre_categoria

class Gastos(models.Model):
    gasto_id = models.AutoField(primary_key=True)
    categoria_gasto = models.ForeignKey(CategoriasGasto, on_delete=models.RESTRICT)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_gasto = models.DateField()
    proveedor = models.CharField(max_length=150, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    personal_id_relacionado = models.ForeignKey(Personal, on_delete=models.SET_NULL, blank=True, null=True)

# --- PARTE V: A PRUEBA DE FUTURO - DATOS PARA IA ---

class MetasMiembro(models.Model):
    meta_id = models.AutoField(primary_key=True)
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    
    TIPO_META_CHOICES = [
        ('Pérdida de peso', 'Pérdida de peso'),
        ('Ganancia muscular', 'Ganancia muscular'),
        ('Mejora de flexibilidad', 'Mejora de flexibilidad'),
        ('Aumento de resistencia', 'Aumento de resistencia'),
        ('Bienestar general', 'Bienestar general'),
    ]
    tipo_meta = models.CharField(max_length=100, choices=TIPO_META_CHOICES)
    valor_objetivo = models.CharField(max_length=50, blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_objetivo = models.DateField(blank=True, null=True)
    
    ESTADO_META_CHOICES = [
        ('Activa', 'Activa'),
        ('Alcanzada', 'Alcanzada'),
        ('Abandonada', 'Abandonada'),
    ]
    estado_meta = models.CharField(max_length=50, choices=ESTADO_META_CHOICES, default='Activa')

class LogsEntrenamiento(models.Model):
    log_id = models.AutoField(primary_key=True)
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    asistencia = models.ForeignKey(Asistencia, on_delete=models.SET_NULL, blank=True, null=True)
    fecha_ejercicio = models.DateField()
    nombre_ejercicio = models.CharField(max_length=100)
    series = models.IntegerField(blank=True, null=True)
    repeticiones = models.IntegerField(blank=True, null=True)
    peso_kg = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    duracion_segundos = models.IntegerField(blank=True, null=True)
    distancia_km = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    notas_personales = models.TextField(blank=True, null=True)

class FeedbackMiembro(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    clase_programada = models.ForeignKey(ClasesProgramadas, on_delete=models.SET_NULL, blank=True, null=True)
    instructor = models.ForeignKey(Personal, on_delete=models.SET_NULL, blank=True, null=True)
    calificacion = models.IntegerField(help_text="Rating from 1 to 5")
    comentario = models.TextField(blank=True, null=True)
    fecha_feedback = models.DateTimeField(auto_now_add=True)

# --- Tablas de Preferencias (Configuración Avanzada) ---

class PreferenciasDefault(models.Model):
    nombre_preferencia = models.CharField(max_length=100, primary_key=True)
    valor_default = models.TextField()
    tipo_dato = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre_preferencia

class PreferenciasUsuarioOverride(models.Model):
    miembro = models.ForeignKey(Miembros, on_delete=models.CASCADE)
    nombre_preferencia = models.ForeignKey(PreferenciasDefault, on_delete=models.CASCADE)
    valor_personalizado = models.TextField()

    class Meta:
        unique_together = ('miembro', 'nombre_preferencia')
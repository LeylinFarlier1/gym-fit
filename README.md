# 🏋️ Gym Fit - Sistema de Gestión de Gimnasio

## 📋 Descripción

Gym Fit es una aplicación web completa para la gestión integral de gimnasios y centros de fitness. Desarrollada con Django (backend) y React (frontend), ofrece una solución escalable y moderna para administrar membresías, clases, pagos, personal y más.

## ✨ Características Principales

- 🏃‍♂️ **Gestión de Miembros**: Registro completo de miembros con planes de membresía personalizables
- 💳 **Sistema de Pagos**: Control de pagos, facturas y estados de cuenta
- 📅 **Gestión de Clases**: Programación de clases, instructores y capacidad máxima
- 👥 **Administración de Personal**: Gestión de empleados, roles y horarios
- 📊 **Dashboard Analytics**: Reportes y métricas de rendimiento del gimnasio
- 🔔 **Sistema de Notificaciones**: Alertas automáticas y recordatorios
- 📱 **API REST**: Backend completo con endpoints para aplicaciones móviles

## 🛠️ Tecnologías Utilizadas

### Backend
- **Django 4.2** - Framework web de Python
- **Django REST Framework** - API REST
- **PostgreSQL** - Base de datos principal
- **Redis** - Cache y message broker
- **Celery** - Procesamiento de tareas asíncronas
- **JWT Authentication** - Autenticación segura

### Frontend
- **React** - Biblioteca de JavaScript para UI
- **Docker & Docker Compose** - Containerización

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de servicios

## 🚀 Instalación y Configuración

### Prerrequisitos
- Docker y Docker Compose instalados
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LeylinFarlier1/gym-fit.git
   cd gym-fit
   ```

2. **Construir y ejecutar los servicios**
   ```bash
   docker-compose up -d --build
   ```

3. **Aplicar migraciones de base de datos**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

4. **Crear superusuario**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Acceder a la aplicación**
   - Backend Admin: http://localhost:8000/admin/
   - Frontend: http://localhost:3000/ (cuando esté implementado)
   - API: http://localhost:8000/api/

## 📊 Modelos de Datos

El sistema incluye los siguientes modelos principales:

- **PlanesMembresia**: Diferentes tipos de membresías
- **Miembros**: Información de los miembros del gimnasio
- **SuscripcionesMiembro**: Suscripciones activas de los miembros
- **Personal**: Empleados y sus roles
- **Clases**: Clases ofrecidas por el gimnasio
- **Reservas**: Sistema de reservas para clases
- **Pagos**: Gestión de pagos y facturación
- **Equipamiento**: Inventario de equipos del gimnasio
- **MantenimientoEquipamiento**: Historial de mantenimiento
- **Notificaciones**: Sistema de alertas y recordatorios

## 🐳 Servicios Docker

El proyecto utiliza los siguientes servicios:

- **backend**: Aplicación Django (Puerto 8000)
- **frontend**: Aplicación React (Puerto 3000)
- **db**: Base de datos PostgreSQL (Puerto 5432)
- **cache**: Redis para cache y message broker (Puerto 6379)
- **celeryworker**: Worker de Celery para tareas asíncronas
- **celerybeat**: Scheduler de Celery para tareas programadas

## 🔧 Comandos Útiles

```bash
# Ver logs de un servicio específico
docker-compose logs backend

# Ejecutar comandos de Django
docker-compose exec backend python manage.py [comando]

# Acceder al shell de Django
docker-compose exec backend python manage.py shell

# Crear nuevas migraciones
docker-compose exec backend python manage.py makemigrations

# Aplicar migraciones
docker-compose exec backend python manage.py migrate

# Recargar servicios después de cambios
docker-compose restart [servicio]
```

## 📁 Estructura del Proyecto

```
gym-fit/
├── backend/                # Aplicación Django
│   ├── core/              # Configuración principal
│   ├── gym/               # App principal del gimnasio
│   ├── requirements.txt   # Dependencias Python
│   └── dockerfile         # Dockerfile del backend
├── frontend/              # Aplicación React (en desarrollo)
├── docker-compose.yml     # Configuración de servicios
├── .gitignore
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Agustín Mealla**
- Email: agustinmealla@gmail.com
- GitHub: [@[tu-usuario]]

## 🔗 Links Útiles

- [Documentación de Django](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Docker Documentation](https://docs.docker.com/)
- [React Documentation](https://reactjs.org/docs/)

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!

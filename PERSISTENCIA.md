# 💾 Sistema de Persistencia de Datos

## 📋 Descripción

El sistema ahora incluye **persistencia automática** de todos los cambios realizados en la aplicación usando **localStorage** del navegador.

## ✨ Características Implementadas

### 1. **Almacenamiento Automático**
Todos los cambios se guardan automáticamente en el navegador:
- ✅ Conductores (crear, editar, eliminar, cambiar estado)
- ✅ Vehículos (crear, editar, eliminar, cambiar estado)
- ✅ Solicitudes de transporte (crear, editar, asignar, completar)
- ✅ Encuestas de satisfacción

### 2. **Sincronización entre Módulos**
Los datos se comparten entre todos los módulos:
- **Admin** → Gestión con tarjetas
- **Management** → Gestión con menú
- **Solicitud** → Formulario de solicitudes
- **Requests** → Tabla de solicitudes
- **Vehicles** → Administración de vehículos
- **Drivers** → Administración de conductores

### 3. **Exportar/Importar Datos**

#### 📤 Exportar
1. Haga clic en el ícono de base de datos en el header (esquina superior derecha)
2. Seleccione **"Exportar datos"**
3. Se descargará un archivo JSON con todos los datos
4. Nombre del archivo: `fleet-backup-YYYY-MM-DD.json`

#### 📥 Importar
1. Haga clic en el ícono de base de datos en el header
2. Seleccione **"Importar datos"**
3. Elija el archivo JSON previamente exportado
4. Los datos se restaurarán y la página se recargará

#### 🗑️ Limpiar Datos
1. Haga clic en el ícono de base de datos en el header
2. Seleccione **"Limpiar todos los datos"**
3. Confirme la acción
4. Se eliminarán todos los datos y se recargarán los datos iniciales

## 🔧 Funcionamiento Técnico

### Servicio de Almacenamiento (`storageService.ts`)

```typescript
// Guardar automáticamente
saveDrivers(drivers);
saveVehicles(vehicles);
saveRequests(requests);
saveSurveys(surveys);

// Cargar al iniciar
const drivers = loadDrivers() || initialDrivers;
const vehicles = loadVehicles() || initialVehicles;
```

### Hooks de React (App.tsx)

```typescript
// Guardar automáticamente cuando cambian los datos
useEffect(() => {
  saveDrivers(drivers);
}, [drivers]);

useEffect(() => {
  saveVehicles(vehicles);
}, [vehicles]);
```

## 📊 Estructura de Datos Exportados

```json
{
  "drivers": [...],
  "vehicles": [...],
  "requests": [...],
  "surveys": [...],
  "exportDate": "2025-10-31T08:52:00.000Z"
}
```

## ⚠️ Consideraciones Importantes

### Limitaciones de localStorage
- **Capacidad:** ~5-10 MB por dominio
- **Alcance:** Solo en el navegador actual
- **Persistencia:** Los datos permanecen hasta que se limpien manualmente

### Recomendaciones
1. **Respaldo regular:** Exporte los datos periódicamente
2. **Navegador privado:** Los datos se pierden al cerrar en modo incógnito
3. **Cambio de navegador:** Los datos no se transfieren automáticamente
4. **Múltiples dispositivos:** Use exportar/importar para sincronizar

## 🎯 Casos de Uso

### Escenario 1: Trabajo Diario
1. Abra la aplicación
2. Los datos del último uso se cargan automáticamente
3. Realice cambios (agregar conductor, crear solicitud, etc.)
4. Los cambios se guardan automáticamente
5. Cierre el navegador - los datos persisten

### Escenario 2: Migración de Datos
1. En el dispositivo origen: Exportar datos
2. Transferir el archivo JSON
3. En el dispositivo destino: Importar datos
4. Continuar trabajando con los mismos datos

### Escenario 3: Respaldo de Seguridad
1. Exportar datos al finalizar el día
2. Guardar el archivo en un lugar seguro (nube, USB)
3. En caso de pérdida: Importar el último respaldo

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────┐
│         Interfaz de Usuario                 │
│  (Admin, Management, Requests, etc.)        │
└──────────────┬──────────────────────────────┘
               │
               │ Modificación de datos
               ▼
┌─────────────────────────────────────────────┐
│          Estado Central (App.tsx)           │
│  - drivers, vehicles, requests, surveys     │
└──────────────┬──────────────────────────────┘
               │
               │ useEffect detecta cambios
               ▼
┌─────────────────────────────────────────────┐
│      Servicio de Almacenamiento             │
│         (storageService.ts)                 │
└──────────────┬──────────────────────────────┘
               │
               │ Guardar/Cargar
               ▼
┌─────────────────────────────────────────────┐
│          localStorage                        │
│  (Navegador - Almacenamiento Persistente)  │
└─────────────────────────────────────────────┘
```

## 📝 Notas de Desarrollo

- **Rendimiento:** Los datos se guardan de forma asíncrona para no bloquear la UI
- **Validación:** Se incluye manejo de errores para datos corruptos
- **Compatibilidad:** Funciona en todos los navegadores modernos
- **Seguridad:** Los datos se almacenan localmente, no se envían a ningún servidor

## 🚀 Próximas Mejoras Sugeridas

1. **Backend API:** Integración con servidor para persistencia en la nube
2. **Sincronización:** Sincronización automática entre dispositivos
3. **Versionado:** Control de versiones de los datos
4. **Compresión:** Compresión de datos para optimizar espacio
5. **Encriptación:** Encriptación de datos sensibles

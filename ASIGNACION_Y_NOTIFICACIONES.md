# Sistema de Asignación de Vehículos y Notificaciones

## Descripción General

Se ha implementado un sistema completo de asignación de vehículos y conductores con notificaciones automáticas para el módulo de Solicitud de Vehículos.

## Características Principales

### 1. **Asignación de Vehículos y Conductores**

#### Funcionalidad
- Permite asignar vehículos y conductores disponibles a solicitudes aprobadas
- Actualiza automáticamente el estado de vehículos y conductores
- Cambia el estado de la solicitud a "En Progreso"

#### Proceso de Asignación
1. Una solicitud debe estar en estado **"Aprobada"** para poder asignar recursos
2. El botón **"Asignar"** aparece solo en solicitudes aprobadas sin asignación
3. Al hacer clic, se abre un modal con:
   - Información de la solicitud
   - Lista de vehículos disponibles
   - Lista de conductores disponibles
   - Checkbox de confirmación

#### Cambios de Estado Automáticos
- **Vehículo**: Pasa de "Disponible" a "En Uso"
- **Conductor**: Pasa de "Disponible" a "En Viaje"
- **Solicitud**: Pasa de "Aprobada" a "En Progreso"

### 2. **Sistema de Notificaciones**

#### Tipos de Notificaciones
1. **Asignación** 🚗
   - Enviada al solicitante con detalles del vehículo y conductor asignados
   - Enviada al conductor con detalles del servicio a realizar

2. **Aprobación** ✅
   - Enviada al solicitante cuando su solicitud es aprobada

3. **Cancelación** ❌
   - Enviada al solicitante si la solicitud es cancelada

4. **Finalización** 🏁
   - Enviada al solicitante cuando el servicio se completa

#### Panel de Notificaciones
- **Ubicación**: Icono de campana en el header (esquina superior derecha)
- **Contador**: Muestra el número de notificaciones no leídas
- **Filtros**: 
  - Todas las notificaciones
  - Solo no leídas
- **Acciones**:
  - Marcar individual como leída
  - Marcar todas como leídas

#### Persistencia
- Las notificaciones se guardan en `localStorage`
- Clave de almacenamiento: `fleet_notifications`
- Se eliminan automáticamente después de 30 días

### 3. **Flujo de Trabajo Completo**

```
1. Usuario crea solicitud → Estado: Pendiente
                                ↓
2. Administrador aprueba → Estado: Aprobada
                                ↓
            Notificación al solicitante (Aprobación)
                                ↓
3. Administrador asigna vehículo/conductor → Estado: En Progreso
                                ↓
            Notificaciones enviadas:
            - Al solicitante (detalles de asignación)
            - Al conductor (detalles del servicio)
                                ↓
4. Conductor completa servicio → Estado: Completada
                                ↓
            Notificación al solicitante (Finalización)
```

## Componentes Creados/Modificados

### Nuevos Archivos

1. **`services/notificationService.ts`**
   - Gestión completa de notificaciones
   - Funciones de envío para cada tipo de notificación
   - Persistencia en localStorage
   - Utilidades de lectura y marcado

2. **`components/NotificationPanel.tsx`**
   - Panel lateral de notificaciones
   - Interfaz visual atractiva
   - Filtrado y gestión de notificaciones

### Archivos Modificados

1. **`components/VehicleRequest.tsx`**
   - Modal `AssignmentModal` para asignación
   - Botón "Asignar" en solicitudes aprobadas
   - Integración con servicio de notificaciones
   - Actualización de estados de vehículos y conductores

2. **`components/Header.tsx`**
   - Icono de notificaciones con contador
   - Actualización automática cada 30 segundos
   - Integración con `NotificationPanel`

3. **`App.tsx`**
   - Paso de `setVehicles` y `setDrivers` a `VehicleRequest`

## Uso del Sistema

### Para Asignar un Vehículo

1. Ir a **Solicitud de Vehículos** → **Consulta**
2. Filtrar por estado **"Aprobada"**
3. Localizar solicitudes sin vehículo asignado
4. Hacer clic en el botón verde **"Asignar"**
5. Seleccionar vehículo disponible de la lista
6. Seleccionar conductor disponible de la lista
7. Marcar el checkbox de confirmación
8. Hacer clic en **"Confirmar Asignación"**

### Para Ver Notificaciones

1. Hacer clic en el icono de campana 🔔 en el header
2. El panel se abre desde la derecha
3. Ver todas las notificaciones o filtrar por no leídas
4. Hacer clic en "Marcar como leída" para notificaciones individuales
5. O usar "Marcar todas como leídas" para limpiar todas

## Notificaciones Automáticas

### Notificación al Solicitante (Asignación)
```
Su solicitud de vehículo para [DESTINO] ha sido aprobada.
Vehículo asignado: [MARCA] [MODELO] ([PLACA])
Conductor asignado: [NOMBRE] - Tel: [TELÉFONO]
Fecha: [FECHA]
```

### Notificación al Conductor (Asignación)
```
Se le ha asignado un nuevo servicio:
Solicitante: [NOMBRE] ([DEPENDENCIA])
Origen: [ORIGEN]
Destino: [DESTINO]
Fecha: [FECHA]
Hora de salida: [HORA]
Hora de llegada: [HORA]
Pasajeros: [NÚMERO]

Por favor confirme su disponibilidad.
```

## Consideraciones Técnicas

### localStorage
- **Capacidad**: 5-10 MB por dominio
- **Persistencia**: Permanente hasta borrado manual
- **Sincronización**: Local, no compartida entre dispositivos

### Estados de Recursos

#### Vehículos (`VehicleStatus`)
- `Available`: Disponible para asignación
- `InUse`: Asignado a un servicio activo
- `Maintenance`: En mantenimiento (no se puede asignar)

#### Conductores (`DriverStatus`)
- `Available`: Disponible para asignación
- `OnTrip`: Asignado a un servicio activo
- `OnLeave`: De permiso (no se puede asignar)

#### Solicitudes (`RequestStatus`)
- `Pending`: Solicitud creada, pendiente de aprobación
- `Approved`: Aprobada, lista para asignación
- `InProgress`: Vehículo y conductor asignados
- `Completed`: Servicio completado
- `Canceled`: Solicitud cancelada

### Integración Futura con Backend

Para integrar con un backend real:

1. **Reemplazar `localStorage`** por llamadas API:
   ```typescript
   // En notificationService.ts
   const sendNotification = async (notification) => {
     await fetch('/api/notifications', {
       method: 'POST',
       body: JSON.stringify(notification)
     });
   };
   ```

2. **Implementar WebSockets** para notificaciones en tiempo real:
   ```typescript
   const ws = new WebSocket('wss://api.example.com/notifications');
   ws.onmessage = (event) => {
     const notification = JSON.parse(event.data);
     displayNotification(notification);
   };
   ```

3. **Envío de emails/SMS**:
   ```typescript
   // En el backend
   await emailService.send({
     to: driver.email,
     subject: 'Nueva asignación de servicio',
     body: notification.message
   });
   ```

## Mejoras Sugeridas

### Corto Plazo
- [ ] Añadir sonido al recibir notificaciones
- [ ] Implementar push notifications del navegador
- [ ] Agregar confirmación del conductor (aceptar/rechazar)
- [ ] Incluir estimación de tiempo de viaje

### Mediano Plazo
- [ ] Integración con API de mapas (Google Maps/Mapbox)
- [ ] Tracking GPS en tiempo real del vehículo
- [ ] Chat entre solicitante y conductor
- [ ] Sistema de calificación post-servicio

### Largo Plazo
- [ ] App móvil para conductores
- [ ] Análisis predictivo de disponibilidad
- [ ] Optimización de rutas automática
- [ ] Dashboard de métricas y KPIs

## Solución de Problemas

### Las notificaciones no aparecen
1. Verificar que localStorage esté habilitado
2. Revisar la consola del navegador para errores
3. Limpiar datos y recargar la página

### El contador no se actualiza
- El contador se actualiza cada 30 segundos
- Cerrar y abrir el panel de notificaciones fuerza la actualización

### No hay vehículos/conductores disponibles
- Verificar el estado de los recursos en Admin → Vehículos/Conductores
- Cambiar manualmente el estado a "Disponible"

## Contacto y Soporte

Para dudas o problemas con el sistema:
- Revisar la consola del navegador (F12)
- Verificar los datos en localStorage
- Consultar este documento

---

**Versión**: 1.0  
**Fecha**: Octubre 2025  
**Sistema**: Gestión de Flota - Personería de Bogotá

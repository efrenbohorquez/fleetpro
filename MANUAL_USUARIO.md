# 📘 Manual de Usuario - FleetPro

## Sistema de Gestión de Flota Vehicular

**Versión:** 1.5.0  
**Fecha:** Enero 2025  
**Desarrollado para:** Gestión integral de vehículos, solicitudes de transporte, conductores y mantenimiento

---

## 📑 Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Acceso al Sistema](#2-acceso-al-sistema)
3. [Panel Principal (Dashboard)](#3-panel-principal-dashboard)
4. [Módulo Vehículos](#4-módulo-vehículos)
5. [Módulo Mantenimiento](#5-módulo-mantenimiento)
6. [Módulo Mis Solicitudes](#6-módulo-mis-solicitudes)
7. [Módulo Historial](#7-módulo-historial)
8. [Módulo Conductores](#8-módulo-conductores)
9. [Módulo Administración](#9-módulo-administración)
10. [Flujos de Trabajo Completos](#10-flujos-de-trabajo-completos)
11. [Solución de Problemas](#11-solución-de-problemas)
12. [Preguntas Frecuentes](#12-preguntas-frecuentes)

---

## 1. Introducción

### ¿Qué es FleetPro?

FleetPro es un sistema web integral diseñado para la gestión eficiente de flotas vehiculares. Permite:

- ✅ Gestionar vehículos y sus hojas de vida
- ✅ Crear y aprobar solicitudes de transporte
- ✅ Asignar vehículos y conductores
- ✅ Programar y dar seguimiento al mantenimiento
- ✅ Administrar conductores y notificaciones por email
- ✅ Consultar historial completo de operaciones

### Roles del Sistema

**👤 Usuario Solicitante**
- Puede crear solicitudes de transporte
- Ver el estado de sus solicitudes
- Consultar historial

**👔 Administrador/Coordinador**
- Todas las funciones del solicitante
- Aprobar/rechazar solicitudes
- Asignar vehículos y conductores
- Gestionar mantenimiento
- Administrar usuarios y conductores

---

## 2. Acceso al Sistema

### Acceso Local

**En el mismo equipo:**
```
http://localhost:5173
```

### Acceso desde Otros Dispositivos (Red Local)

**En dispositivos móviles o computadoras en la misma WiFi:**

1. **Verificar IP del servidor:**
   - Windows: Abrir PowerShell → `ipconfig`
   - Buscar "Adaptador de LAN inalámbrica"
   - Anotar la dirección IPv4 (ej: 192.168.2.5)

2. **Acceder desde navegador:**
   ```
   http://[IP_DEL_SERVIDOR]:5173
   
   Ejemplo: http://192.168.2.5:5173
   ```

3. **Requisitos:**
   - ✅ Ambos dispositivos conectados a la misma WiFi
   - ✅ Firewall configurado (puerto 5173 abierto)
   - ✅ Servidor ejecutándose (`npm run dev`)

### Navegadores Compatibles

- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Safari (iOS/macOS)

---

## 3. Panel Principal (Dashboard)

### Vista General

Al iniciar sesión verás cuatro tarjetas con estadísticas:

#### 🚗 Total Vehículos
- Muestra la cantidad total de vehículos en la flota
- Color: Verde azulado
- Clic para ir al módulo Vehículos

#### 👨‍💼 Total Conductores
- Cantidad de conductores registrados
- Color: Naranja
- Clic para ir al módulo Conductores

#### 📋 Solicitudes Pendientes
- Solicitudes que esperan aprobación/asignación
- Color: Azul
- Clic para ir a Mis Solicitudes

#### 🔧 Mantenimientos Programados
- Mantenimientos próximos y en curso
- Color: Morado
- Clic para ir al módulo Mantenimiento

### Navegación

**Menú Lateral (Sidebar):**
- Dashboard
- Vehículos
- Mantenimiento
- Mis Solicitudes
- Historial
- Conductores
- Administración

---

## 4. Módulo Vehículos

### 4.1 Vista de Listado

**Elementos de la interfaz:**

📊 **Barra de estadísticas:**
- Total de vehículos
- Vehículos disponibles
- Vehículos en mantenimiento
- Vehículos asignados

🔍 **Búsqueda y filtros:**
- Buscar por placa, marca o modelo
- Filtrar por estado (Todos/Disponible/En Mantenimiento/Asignado)

📋 **Tabla de vehículos:**
- Placa
- Marca/Modelo
- Año
- Estado (con indicador de color)
- Botón "Ver Detalles"

### 4.2 Detalles del Vehículo

Al hacer clic en "Ver Detalles" se abre un modal con 5 secciones:

#### 📘 Sección 1: Información Básica (Azul)
- Placa
- Marca y Modelo
- Año
- Color
- Tipo de vehículo
- Capacidad de pasajeros

#### 📗 Sección 2: Información Técnica (Verde)
- Motor (cilindrada, potencia)
- Combustible
- Transmisión
- Sistema de tracción
- Kilometraje actual
- VIN (número de chasis)

#### 📙 Sección 3: Documentación (Naranja)
- SOAT: Vigencia y estado
- Tecnomecánica: Vigencia y estado
- Seguro: Detalles de póliza
- Tarjeta de propiedad

#### 📕 Sección 4: Información Administrativa (Rojo)
- Propietario
- Asignado a (conductor actual)
- Sede/Ubicación
- Tipo de servicio
- Estado operacional
- Observaciones

#### 📜 Sección 5: Historial (Gris)
- Fecha de adquisición
- Fecha de último mantenimiento
- Total de mantenimientos realizados
- Costo acumulado de mantenimientos
- Notas adicionales

### 4.3 Estados de Vehículo

| Estado | Color | Significado |
|--------|-------|-------------|
| 🟢 Disponible | Verde | Listo para ser asignado |
| 🟡 En Mantenimiento | Amarillo | En taller o servicio |
| 🔵 Asignado | Azul | Actualmente en uso |
| 🔴 Fuera de Servicio | Rojo | No operativo |

---

## 5. Módulo Mantenimiento

### 5.1 Funciones Principales

**Gestionar mantenimientos:**
- Programar nuevos mantenimientos
- Ver mantenimientos activos
- Historial de mantenimientos

### 5.2 Programar Mantenimiento

**Paso a paso:**

1. **Clic en "Programar Mantenimiento"**

2. **Llenar formulario:**
   - 🚗 **Vehículo:** Seleccionar de la lista
   - 📅 **Fecha Programada:** Fecha del servicio
   - 🔧 **Tipo:** Preventivo, Correctivo, SOAT, Tecnomecánica, etc.
   - 📝 **Descripción:** Detalle del trabajo a realizar
   - 💰 **Costo Estimado:** Presupuesto aproximado
   - ⚠️ **Prioridad:** Baja, Media, Alta, Urgente

3. **Guardar:** El vehículo cambia automáticamente a "En Mantenimiento"

### 5.3 Estados del Mantenimiento

| Estado | Descripción |
|--------|-------------|
| ⏳ Programado | Agendado pero no iniciado |
| 🔧 En Progreso | En ejecución |
| ✅ Completado | Finalizado exitosamente |
| ❌ Cancelado | Cancelado por algún motivo |

### 5.4 Completar Mantenimiento

**Proceso:**

1. Buscar el mantenimiento en la lista
2. Clic en "Completar"
3. Ingresar:
   - Fecha real de finalización
   - Costo final
   - Observaciones finales
4. Confirmar: El vehículo vuelve a "Disponible"

### 5.5 Filtros y Búsqueda

- 🔍 Buscar por placa de vehículo
- 📊 Filtrar por estado
- 🔧 Filtrar por tipo de mantenimiento
- ⚠️ Filtrar por prioridad

---

## 6. Módulo Mis Solicitudes

### 6.1 ¿Qué son las Solicitudes?

Las solicitudes de transporte permiten a los usuarios solicitar vehículos para desplazamientos oficiales.

### 6.2 Crear Nueva Solicitud

**Paso 1: Abrir formulario**
- Clic en botón "Nueva Solicitud"

**Paso 2: Información del Solicitante**
- 👤 **Nombre del Solicitante:** Nombre completo
- 📧 **Email del Solicitante:** Correo electrónico
- 🏢 **Dependencia:** Área o departamento
- 📧 **Email de la Dependencia:** Correo del área

**Paso 3: Información del Viaje**
- 📅 **Fecha de Solicitud:** Día en que se crea la solicitud
- 🚀 **Fecha de Salida:** Cuándo se necesita el vehículo
- 📍 **Origen:** Punto de partida
- 🎯 **Destino:** Punto de llegada
- 👥 **N° de Pasajeros:** Cantidad de personas
- 📝 **Motivo del Desplazamiento:** ⭐ **Descripción detallada del viaje**
- 💬 **Observaciones:** Información adicional (opcional)

**Paso 4: Enviar**
- Clic en "Enviar Solicitud"
- La solicitud queda en estado **PENDIENTE**

### 6.3 Estados de Solicitud

| Estado | Color | Descripción |
|--------|-------|-------------|
| ⏳ Pendiente | Amarillo | Esperando aprobación |
| ✅ Aprobada | Verde | Aprobada, esperando asignación |
| 🚗 Asignada | Azul | Vehículo y conductor asignados |
| ❌ Rechazada | Rojo | No aprobada |
| 🏁 Completada | Gris | Finalizada |

### 6.4 Panel de Solicitudes Pendientes

**Características:**
- Muestra **SOLO solicitudes sin asignar**
- Las aprobadas/rechazadas aparecen en **Historial**
- Título: "Solicitudes Pendientes"

**Filtros disponibles:**
- 🔍 Buscar por: Solicitante, Dependencia, Destino, Origen
- 📅 Fecha de salida desde
- 📅 Fecha de salida hasta

**Información visible:**
- Solicitante y dependencia
- Fecha de salida
- Ruta (Origen → Destino)
- N° de pasajeros
- Estado actual

### 6.5 Ver Detalles de Solicitud

**Al hacer clic en una solicitud se muestra:**

📋 **Información Completa:**
- Datos del solicitante
- Fecha de solicitud y fecha de salida
- Ruta completa
- Número de pasajeros
- ⭐ **Motivo del Viaje (destacado en amarillo)**
- Observaciones

🎯 **Acciones según rol:**

**Para Administradores:**
- ✅ **Aprobar:** Cambia estado a "Aprobada"
- ❌ **Rechazar:** Cambia estado a "Rechazada"
- 🚗 **Asignar Vehículo y Conductor:** Si está aprobada

**Para Usuarios:**
- Solo visualización
- Ver estado actual

### 6.6 Asignar Vehículo y Conductor

**Requisitos:**
- Solicitud debe estar **Aprobada**
- Vehículos **Disponibles** con capacidad suficiente
- Conductores **Disponibles**

**Proceso:**

1. **Clic en "Asignar"** en solicitud aprobada

2. **Seleccionar Vehículo:**
   - Lista filtrada por capacidad (≥ N° pasajeros)
   - Solo muestra vehículos disponibles
   - Ver placa, marca, modelo, capacidad

3. **Seleccionar Conductor:**
   - Lista de conductores disponibles
   - Ver nombre, teléfono, email

4. **Notificación por Email:**
   - ✅ Marcar "Enviar notificación por email"
   - Se enviará email al conductor asignado

5. **Confirmar Asignación:**
   - Vehículo cambia a "Asignado"
   - Conductor queda asignado
   - Solicitud pasa a estado "Asignada"
   - **Se archiva automáticamente** (pasa a Historial)

---

## 7. Módulo Historial

### 7.1 Propósito

Visualizar **todas las solicitudes archivadas**:
- Aprobadas y asignadas
- Rechazadas
- Completadas

**NO muestra:** Solicitudes pendientes (esas están en "Mis Solicitudes")

### 7.2 Filtros Avanzados

🔍 **Búsqueda por texto:**
- Solicitante
- Dependencia
- Destino
- Origen

📊 **Filtro por estado:**
- Todos
- Aprobadas
- Asignadas
- Rechazadas
- Completadas

📅 **Filtro por fechas:**
- Fecha de solicitud desde
- Fecha de solicitud hasta
- Fecha de salida desde
- Fecha de salida hasta

### 7.3 Información Mostrada

**Tabla con columnas:**
- Fecha de Solicitud
- Solicitante
- Dependencia
- Ruta (Origen → Destino)
- Pasajeros
- Estado (con color)
- Botón "Ver Detalles"

### 7.4 Detalles del Historial

**Modal con información completa:**

📋 **Datos de la Solicitud:**
- Toda la información original
- ⭐ **Motivo del Viaje** (destacado)

🚗 **Asignación (si aplica):**
- Vehículo asignado (placa, marca, modelo)
- Conductor asignado (nombre, teléfono)

📊 **Estado y Fechas:**
- Estado final
- Fecha de solicitud
- Fecha de salida

### 7.5 Exportar a CSV

**Función para reportes:**

1. Clic en "Exportar a CSV"
2. Se descarga archivo con todas las solicitudes visibles (según filtros)
3. Contiene:
   - ID
   - Solicitante y email
   - Dependencia y email
   - Fechas (solicitud y salida)
   - Origen y destino
   - Pasajeros
   - Motivo
   - Observaciones
   - Estado
   - Vehículo asignado (si aplica)
   - Conductor asignado (si aplica)

**Usos:**
- Reportes mensuales
- Análisis estadísticos
- Auditorías

---

## 8. Módulo Conductores

### 8.1 Gestión de Conductores

**Vista principal muestra:**
- Total de conductores
- Conductores disponibles
- Conductores asignados

### 8.2 Agregar Nuevo Conductor

**Formulario:**

👤 **Información Personal:**
- Nombre completo
- Número de documento
- Teléfono de contacto
- 📧 **Email** (importante para notificaciones)

🚗 **Información Profesional:**
- Número de licencia de conducción
- Categoría de licencia (B1, B2, C1, etc.)
- Fecha de vencimiento de la licencia

📊 **Estado:**
- Disponible (por defecto)
- Asignado (cuando tiene vehículo activo)
- Inactivo (no disponible)

### 8.3 Editar Conductor

1. Buscar conductor en la lista
2. Clic en "Editar"
3. Modificar campos necesarios
4. Guardar cambios

### 8.4 Sistema de Notificaciones por Email

**¿Cuándo se envían emails?**

✅ Al **asignar un conductor** a una solicitud:

**Contenido del email:**
```
Asunto: Nueva Asignación de Servicio de Transporte

Estimado/a [Nombre del Conductor],

Se le ha asignado un nuevo servicio de transporte:

📋 DETALLES DE LA SOLICITUD:
- Solicitante: [Nombre]
- Dependencia: [Área]
- Fecha de Salida: [DD/MM/AAAA]
- Origen: [Ubicación]
- Destino: [Ubicación]
- N° de Pasajeros: [Cantidad]
- Motivo: [Descripción]

🚗 VEHÍCULO ASIGNADO:
- Placa: [XXX-000]
- Marca/Modelo: [Marca Modelo]

Por favor, confirmar disponibilidad y preparar el vehículo.

Atentamente,
Sistema FleetPro
```

**Configuración:**
- El email del conductor debe estar registrado
- Marcar checkbox "Enviar notificación" al asignar
- Verificar que el servicio de email esté configurado

### 8.5 Búsqueda y Filtros

- 🔍 Buscar por nombre o documento
- 📊 Filtrar por estado (Disponible/Asignado/Inactivo)
- Ver licencia y fecha de vencimiento

---

## 9. Módulo Administración

### 9.1 Gestión de Usuarios (Pendiente)

*Esta sección estará disponible en futuras versiones.*

Permitirá:
- Crear usuarios del sistema
- Asignar roles (Usuario/Administrador)
- Gestionar permisos
- Restablecer contraseñas

### 9.2 Configuración del Sistema (Pendiente)

*Próximamente incluirá:*
- Configuración de emails
- Parámetros del sistema
- Backup y restauración
- Reportes personalizados

---

## 10. Flujos de Trabajo Completos

### 10.1 Flujo: Solicitud de Transporte Completa

```
1️⃣ CREACIÓN
   Usuario → "Nueva Solicitud"
   → Llenar formulario completo
   → Incluir motivo del viaje
   → "Enviar Solicitud"
   → Estado: PENDIENTE

2️⃣ REVISIÓN
   Administrador → "Mis Solicitudes"
   → Ver solicitud pendiente
   → Leer motivo del viaje
   → Decidir: Aprobar o Rechazar

3️⃣ APROBACIÓN
   → Clic "Aprobar"
   → Estado: APROBADA
   → Solicitud sigue en panel principal

4️⃣ ASIGNACIÓN
   → Clic "Asignar"
   → Seleccionar vehículo (capacidad adecuada)
   → Seleccionar conductor
   → Marcar "Enviar notificación por email"
   → Confirmar

5️⃣ NOTIFICACIÓN
   → Conductor recibe email con detalles
   → Vehículo cambia a "Asignado"
   → Estado: ASIGNADA
   → **Solicitud se archiva automáticamente**

6️⃣ CONSULTA DE HISTORIAL
   → Usuario o Admin → "Historial"
   → Buscar solicitud por filtros
   → Ver estado "Asignada"
   → Ver vehículo y conductor asignados

7️⃣ COMPLETAR (Después del viaje)
   → Admin → "Historial"
   → Buscar solicitud
   → Cambiar estado a "Completada" (manual)
   → Liberar vehículo y conductor
```

### 10.2 Flujo: Mantenimiento Preventivo

```
1️⃣ PROGRAMAR
   Admin → "Mantenimiento"
   → "Programar Mantenimiento"
   → Seleccionar vehículo
   → Tipo: "Preventivo"
   → Fecha programada
   → Descripción (ej: "Cambio de aceite 10,000 km")
   → Costo estimado: $150
   → Prioridad: Media
   → Guardar

2️⃣ INICIO AUTOMÁTICO
   → Vehículo cambia a "En Mantenimiento"
   → No aparece en lista de disponibles
   → Estado mantenimiento: "Programado"

3️⃣ EJECUCIÓN
   → Llevar vehículo al taller
   → Cambiar estado a "En Progreso"

4️⃣ COMPLETAR
   → Regresar de taller
   → Clic "Completar"
   → Fecha final: [Hoy]
   → Costo final: $165
   → Observaciones: "Se cambió también filtro de aire"
   → Confirmar

5️⃣ VEHÍCULO DISPONIBLE
   → Estado vehículo: "Disponible"
   → Mantenimiento: "Completado"
   → Registrado en historial del vehículo
```

### 10.3 Flujo: Solicitud Rechazada

```
1️⃣ CREACIÓN
   Usuario crea solicitud
   → Estado: PENDIENTE

2️⃣ REVISIÓN Y RECHAZO
   Admin revisa motivo
   → Decide rechazar
   → Clic "Rechazar"
   → Estado: RECHAZADA

3️⃣ ARCHIVADO
   → **Se archiva automáticamente**
   → Ya NO aparece en "Mis Solicitudes"

4️⃣ CONSULTA
   → Usuario → "Historial"
   → Buscar su solicitud
   → Ver estado "Rechazada"
   → Puede crear nueva solicitud si es necesario
```

---

## 11. Solución de Problemas

### ❌ Problema: "No aparece el motivo del viaje en la solicitud"

**Solución:**
- ✅ **RESUELTO en versión actual**
- Actualizar a la última versión
- El campo `purpose` ahora se guarda correctamente

**Verificar:**
1. Crear nueva solicitud
2. Llenar "Motivo del Desplazamiento"
3. Guardar
4. Ver detalles → Debe aparecer en amarillo

---

### ❌ Problema: "Las solicitudes aprobadas aparecen en Mis Solicitudes"

**Solución:**
- ✅ **RESUELTO en versión actual**
- El panel ahora muestra SOLO solicitudes pendientes
- Las aprobadas/rechazadas/asignadas están en **Historial**

**Comportamiento correcto:**
- **Mis Solicitudes:** Solo PENDIENTES
- **Historial:** Aprobadas, Asignadas, Rechazadas, Completadas

---

### ❌ Problema: "No puedo acceder desde mi celular"

**Diagnóstico:**

1. **Verificar que ambos dispositivos estén en la misma WiFi**
   ```
   PC: Conectado a "STARK 5G"
   Celular: Debe estar en "STARK 5G"
   ```

2. **Verificar IP del servidor:**
   - En PC: PowerShell → `ipconfig`
   - Buscar "Adaptador de LAN inalámbrica"
   - Anotar IPv4 (ej: 192.168.2.5)

3. **Verificar firewall:**
   - Windows: Firewall de Windows Defender
   - Buscar regla "VITE DEV SERVER"
   - Verificar que esté **Habilitada**

4. **Verificar servidor corriendo:**
   - En PC debe estar ejecutándose `npm run dev`
   - Debe decir: "Network: http://192.168.2.5:5173"

5. **En celular:**
   ```
   http://192.168.2.5:5173
   ```

**Si persiste:**
- Desactivar temporalmente firewall para probar
- Verificar que no haya VPN activa
- Reiniciar router WiFi

---

### ❌ Problema: "El email de notificación no se envía"

**Causas comunes:**

1. **Email del conductor no registrado**
   - Ir a "Conductores"
   - Editar conductor
   - Verificar que tenga email válido

2. **Servicio de email no configurado**
   - El sistema requiere configuración de servidor SMTP
   - Contactar al administrador del sistema

3. **Checkbox no marcado**
   - Al asignar, verificar marcar "Enviar notificación por email"

---

### ❌ Problema: "No hay vehículos disponibles para asignar"

**Verificar:**

1. **Capacidad insuficiente:**
   - La solicitud requiere 5 pasajeros
   - Solo hay vehículos de 4 plazas disponibles
   - **Solución:** Solicitar vehículo de mayor capacidad

2. **Todos en mantenimiento:**
   - Ir a "Vehículos"
   - Verificar cuántos están "En Mantenimiento"
   - **Solución:** Completar mantenimientos o esperar

3. **Todos asignados:**
   - Ir a "Vehículos"
   - Ver cuántos están "Asignados"
   - **Solución:** Completar servicios anteriores o usar otro vehículo

---

### ❌ Problema: "Error al guardar datos"

**Solución:**

1. **Limpiar caché del navegador:**
   - Chrome: Ctrl+Shift+Delete
   - Borrar "Datos de sitios web"
   - Cerrar y abrir navegador

2. **Verificar campos obligatorios:**
   - Todos los campos con * son requeridos
   - Fechas deben estar en formato correcto

3. **Recargar página:**
   - F5 o Ctrl+R
   - Intentar nuevamente

---

## 12. Preguntas Frecuentes

### ❓ ¿Puedo editar una solicitud ya creada?

**R:** No directamente. Si necesitas modificar:
1. Rechazar la solicitud actual
2. Crear una nueva con los datos correctos

### ❓ ¿Cómo sé si un conductor recibió la notificación?

**R:** Actualmente el sistema solo envía el email. Para confirmación:
- Contactar al conductor por teléfono
- En futuras versiones habrá confirmación de lectura

### ❓ ¿Puedo asignar el mismo vehículo a varias solicitudes?

**R:** No. Un vehículo asignado no aparece en la lista de disponibles hasta que:
- Complete el servicio
- Se libere manualmente

### ❓ ¿Qué pasa si olvido completar un mantenimiento?

**R:** El vehículo permanecerá "En Mantenimiento" indefinidamente. Debes:
1. Ir a "Mantenimiento"
2. Buscar el mantenimiento pendiente
3. Clic "Completar" con los datos finales

### ❓ ¿Los datos se comparten entre varios usuarios?

**R:** Actualmente NO. Cada navegador tiene sus propios datos (localStorage).

**Para datos compartidos:**
- Usar el mismo dispositivo/navegador
- O implementar servidor con base de datos (próximamente)

### ❓ ¿Cómo exporto reportes?

**R:** En "Historial":
1. Aplicar filtros deseados (fechas, estado, etc.)
2. Clic "Exportar a CSV"
3. Abrir con Excel para análisis

### ❓ ¿Puedo acceder desde internet (fuera de la red local)?

**R:** Actualmente NO. Solo en red local (WiFi).

**Para acceso por internet:**
- Desplegar en servidor Ubuntu con Cloudflare Tunnel
- Usar servicios cloud (Firebase, Hostinger VPS)
- Ver documentación en `DESPLIEGUE.md`

### ❓ ¿Hay límite de solicitudes o vehículos?

**R:** No hay límite técnico. El navegador puede almacenar:
- Miles de solicitudes
- Cientos de vehículos
- Sin afectar rendimiento

### ❓ ¿Se pueden hacer backups de los datos?

**R:** El sistema guarda automáticamente en localStorage del navegador.

**Backup manual:**
- Exportar historial a CSV periódicamente
- Guardar copias en carpeta segura

**Backup automático:**
- Próximamente con base de datos en servidor

### ❓ ¿Qué navegador es mejor?

**R:** Google Chrome (recomendado):
- Mejor rendimiento
- Compatible con todas las funciones
- Actualizaciones automáticas

### ❓ ¿Puedo usar en tablet?

**R:** Sí. Totalmente compatible con:
- Tablets Android (Chrome)
- iPad (Safari)
- Tablets Windows (Edge/Chrome)

---

## 📞 Soporte Técnico

### Contacto

Para ayuda adicional:
- 📧 Email: [tu-email@empresa.com]
- 📱 Teléfono: [XXX-XXX-XXXX]
- 🌐 Documentación técnica: Ver `DESPLIEGUE.md` y `PRUEBAS_SISTEMA.md`

### Actualizaciones

Este sistema se actualiza periódicamente. Revisa:
- Versión actual en el footer de la aplicación
- Notas de versión en el repositorio Git

---

## 📋 Checklist de Inicio Rápido

### Para Administradores (Primera Vez)

- [ ] Agregar todos los vehículos de la flota
- [ ] Registrar todos los conductores con emails
- [ ] Verificar datos completos de cada vehículo
- [ ] Programar mantenimientos próximos
- [ ] Configurar acceso de red si es necesario
- [ ] Crear regla de firewall (Windows)
- [ ] Probar acceso desde dispositivo móvil
- [ ] Capacitar a usuarios solicitantes

### Para Usuarios (Primera Vez)

- [ ] Acceder al sistema (localhost o IP de red)
- [ ] Familiarizarse con el Dashboard
- [ ] Crear una solicitud de prueba
- [ ] Ver cómo se visualiza en Historial
- [ ] Guardar la IP de acceso si trabajas en móvil
- [ ] Anotar el teléfono/email de soporte

---

## 🎯 Resumen de Módulos

| Módulo | Función Principal | Usuarios |
|--------|------------------|----------|
| **Dashboard** | Vista general y estadísticas | Todos |
| **Vehículos** | Gestión de flota y hojas de vida | Admin |
| **Mantenimiento** | Programar y dar seguimiento | Admin |
| **Mis Solicitudes** | Crear y gestionar solicitudes pendientes | Todos |
| **Historial** | Consultar solicitudes archivadas | Todos |
| **Conductores** | Gestión de conductores y notificaciones | Admin |
| **Administración** | Configuración del sistema (próximamente) | Admin |

---

**🚀 ¡Listo para usar FleetPro!**

Si tienes dudas adicionales, consulta la documentación técnica o contacta al soporte.

---

*Documento generado: Enero 2025*  
*Versión del Manual: 1.0*  
*Versión del Sistema: 1.5.0*

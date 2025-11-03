# 🧪 PRUEBA DEL MÓDULO DE SOLICITUDES - PASO A PASO

**URL:** http://localhost:5173/  
**Fecha:** 2 de noviembre de 2025  
**Funcionalidad a Probar:** Archivado automático de solicitudes aprobadas/rechazadas

---

## 🎯 OBJETIVO DE LA PRUEBA

Verificar que cuando se **aprueba** o **rechaza** una solicitud, esta se archive automáticamente en el **Historial** y desaparezca de **Solicitudes Activas**.

---

## 📋 PASO 1: VERIFICAR DATOS INICIALES

### 1.1 - Crear un Conductor (si no existe)
```
✅ Acción:
1. Click en el menú lateral: "Conductores"
2. Click en botón: "Crear Conductor"
3. Llenar formulario:
   - Nombre: Pedro González
   - Email: pedro.gonzalez@flota.com
   - Licencia: C987654321
   - Teléfono: 3101234567
   - Estado: Disponible
4. Click: "Guardar"

✅ Resultado Esperado:
- Conductor aparece en la lista
- Email es obligatorio (validación)
```

### 1.2 - Crear un Vehículo (si no existe)
```
✅ Acción:
1. Click en el menú: "Vehículos"
2. Click: "Crear Vehículo"
3. Llenar MÍNIMO estos campos obligatorios:
   - PLACA: XYZ789
   - MARCA: Chevrolet
   - LÍNEA: Captiva
   - AÑO: 2023
   - ESTADO: Disponible
4. Click: "💾 Guardar"

✅ Resultado Esperado:
- Vehículo aparece en la lista con placa XYZ789
```

---

## 📋 PASO 2: CREAR SOLICITUD PENDIENTE

```
✅ Acción:
1. Click en el menú: "Solicitudes Activas"
2. Click en: "Nueva Solicitud"
3. Llenar el formulario:

   📝 Información del Solicitante:
   - Solicitante: María López
   - Email Solicitante: maria.lopez@notaria.com
   - Dependencia: Notaría Primera
   - Cargo/Función: Notaria
   - Teléfono: 3209876543

   📅 Detalles del Viaje:
   - Fecha de Inicio: 03/11/2025 (mañana)
   - Fecha de Fin: 03/11/2025 (mismo día)
   - Hora de Salida: 08:00
   - Hora de Regreso: 17:00

   📍 Destino e Información:
   - Destino: Calle 26 #51-53, Bogotá
   - Motivo del Viaje: Diligencia judicial urgente
   - Número de Pasajeros: 2
   - Observaciones: Requiere vehículo con aire acondicionado

4. Click: "Enviar Solicitud"

✅ Resultado Esperado:
- Mensaje de confirmación: "Solicitud enviada exitosamente"
- La solicitud aparece en la tabla de "Solicitudes Pendientes"
- Estado: "Pendiente" (badge amarillo)
- Fecha de creación visible
```

---

## 📋 PASO 3: APROBAR Y ASIGNAR (PRUEBA PRINCIPAL)

```
✅ Acción:
1. En la tabla de solicitudes, localizar la solicitud de "María López"
2. Click en el botón: "Ver Detalle" (ícono de ojo 👁️)
3. En el modal que se abre:
   
   📋 Verificar Información:
   - Solicitante: María López
   - Email: maria.lopez@notaria.com
   - Dependencia: Notaría Primera
   - Destino: Calle 26 #51-53, Bogotá
   
   🚗 Asignar Vehículo:
   - En el dropdown "Seleccionar Vehículo"
   - Elegir: "Captiva - XYZ789"
   
   👨‍✈️ Asignar Conductor:
   - En el dropdown "Seleccionar Conductor"
   - Elegir: "Pedro González"
   
4. Click en: "✅ Aprobar"

✅ Resultado Esperado - CRÍTICO:
- Mensaje: "✅ Solicitud aprobada y asignada. Se ha movido al historial."
- El modal se cierra automáticamente
- La solicitud DESAPARECE de "Solicitudes Activas"
- NO debe aparecer más en esta vista

✅ Verificar en Consola del Navegador (F12):
- Mensaje: "📧 Notificación de asignación enviada a: maria.lopez@notaria.com"
- Mensaje: "📧 Notificación de asignación enviada al conductor: pedro.gonzalez@flota.com"
```

---

## 📋 PASO 4: VERIFICAR EN HISTORIAL

```
✅ Acción:
1. Click en el menú lateral: "Historial"
2. Buscar la solicitud de "María López"

✅ Resultado Esperado:
- La solicitud APARECE en el historial
- Estado: "Approved" (badge verde/azul)
- Vehículo Asignado: Captiva - XYZ789
- Conductor Asignado: Pedro González
- Fecha de Archivo: Hoy (2 de noviembre de 2025)

✅ Verificar Detalle:
3. Click en "Ver Detalle" de la solicitud archivada
4. Verificar que toda la información esté completa:
   - Datos del solicitante
   - Vehículo y conductor asignados
   - Fechas y horarios
   - Estado: Approved
```

---

## 📋 PASO 5: PROBAR RECHAZO DE SOLICITUD

```
✅ Acción:
1. Volver a: "Solicitudes Activas"
2. Click: "Nueva Solicitud"
3. Crear otra solicitud rápida:
   - Solicitante: Carlos Ruiz
   - Email: carlos.ruiz@notaria.com
   - Dependencia: Notaría Segunda
   - Fecha inicio: 04/11/2025
   - Fecha fin: 04/11/2025
   - Hora salida: 09:00
   - Destino: Carrera 7 #40-62
   - Motivo: Reunión administrativa
   - Pasajeros: 1

4. Click: "Enviar Solicitud"
5. Click en: "Ver Detalle" de la solicitud de Carlos Ruiz
6. SIN asignar vehículo ni conductor
7. Click en: "❌ Rechazar"
8. Confirmar el rechazo en el diálogo

✅ Resultado Esperado:
- Mensaje: "❌ Solicitud rechazada y movida al historial"
- La solicitud DESAPARECE de "Solicitudes Activas"
- NO debe quedar ninguna solicitud pendiente de Carlos Ruiz

✅ Verificar en Historial:
9. Ir a: "Historial"
10. Buscar solicitud de "Carlos Ruiz"
11. Estado: "Canceled" (badge rojo)
12. Vehículo Asignado: (vacío o "No asignado")
13. Conductor Asignado: (vacío o "No asignado")
```

---

## 📋 PASO 6: VERIFICAR FILTROS EN HISTORIAL

```
✅ Acción:
1. En "Historial", usar el filtro de estado
2. Seleccionar: "Approved"

✅ Resultado Esperado:
- Solo aparece la solicitud de María López
- La de Carlos Ruiz (Canceled) NO aparece

✅ Acción:
3. Cambiar filtro a: "Canceled"

✅ Resultado Esperado:
- Solo aparece la solicitud de Carlos Ruiz
- La de María López NO aparece

✅ Acción:
4. Probar búsqueda: Escribir "María" en el buscador

✅ Resultado Esperado:
- Solo aparece la solicitud de María López
```

---

## 📋 PASO 7: EXPORTAR CSV

```
✅ Acción:
1. En "Historial", click en: "Exportar CSV"

✅ Resultado Esperado:
- Se descarga un archivo: solicitudes_historial_2025-11-02.csv
- Al abrirlo, contiene las 2 solicitudes archivadas
- Columnas: ID, Solicitante, Dependencia, Email, Destino, Estado, etc.
```

---

## 📋 PASO 8: VERIFICAR SOLICITUDES ACTIVAS VACÍAS

```
✅ Acción:
1. Volver a: "Solicitudes Activas"

✅ Resultado Esperado:
- Mensaje: "No hay solicitudes pendientes"
- O lista vacía
- NO deben aparecer las solicitudes aprobadas/rechazadas
```

---

## 📋 PASO 9: VERIFICAR PERSISTENCIA

```
✅ Acción:
1. Recargar la página (F5) o cerrar y abrir el navegador
2. Ir a "Solicitudes Activas"

✅ Resultado Esperado:
- Sigue vacío (o solo con nuevas solicitudes)
- Las solicitudes archivadas NO reaparecen

✅ Acción:
3. Ir a "Historial"

✅ Resultado Esperado:
- Las 2 solicitudes archivadas siguen ahí:
  * María López - Approved
  * Carlos Ruiz - Canceled
```

---

## ✅ CHECKLIST DE VALIDACIÓN

Marca cada ítem después de probarlo:

### Crear Solicitud
- [ ] Se puede crear solicitud con todos los campos
- [ ] Email del solicitante es obligatorio
- [ ] Validación de fechas funciona
- [ ] Solicitud aparece en "Solicitudes Activas"

### Aprobar con Asignación
- [ ] Se puede seleccionar vehículo del dropdown
- [ ] Se puede seleccionar conductor del dropdown
- [ ] Botón "Aprobar" funciona
- [ ] Mensaje: "Se ha movido al historial"
- [ ] Solicitud desaparece de activas
- [ ] Notificaciones en consola (F12)

### Archivar en Historial
- [ ] Solicitud aprobada aparece en Historial
- [ ] Estado es "Approved"
- [ ] Vehículo y conductor asignados visibles
- [ ] Fecha de archivo es correcta

### Rechazar Solicitud
- [ ] Botón "Rechazar" funciona
- [ ] Confirmación aparece
- [ ] Mensaje: "rechazada y movida al historial"
- [ ] Solicitud desaparece de activas

### Historial Funcional
- [ ] Filtro por estado funciona
- [ ] Búsqueda por texto funciona
- [ ] Exportar CSV funciona
- [ ] Detalle modal muestra toda la información
- [ ] Fecha de archivo visible

### Persistencia
- [ ] Datos se mantienen después de recargar
- [ ] Historial persiste en localStorage
- [ ] Solicitudes activas se mantienen separadas

---

## 🎯 RESULTADOS ESPERADOS FINALES

### ✅ ANTES (Sistema Antiguo):
```
Solicitudes Activas:
├── Pendiente
├── Aprobada (quedaba aquí ❌)
├── Completada (quedaba aquí ❌)
└── Cancelada (quedaba aquí ❌)

Historial: (no existía)
```

### ✅ DESPUÉS (Sistema Nuevo):
```
Solicitudes Activas:
└── Solo Pendientes ✅

Historial:
├── Aprobadas ✅
├── Completadas ✅
└── Canceladas ✅
```

---

## 🐛 POSIBLES PROBLEMAS

Si encuentras alguno de estos problemas, repórtalo:

1. **Solicitud no desaparece de activas**: Verificar que el estado sea Approved o Canceled
2. **No aparece en historial**: Revisar consola (F12) por errores de localStorage
3. **Notificaciones no se envían**: Verificar que email del conductor y solicitante estén completos
4. **Filtros no funcionan**: Verificar que el estado de la solicitud sea exactamente "Approved" o "Canceled"

---

## 📊 RESUMEN DE FLUJO

```
FLUJO COMPLETO:

1. Nueva Solicitud → Solicitudes Activas (Pendiente)
                      ↓
2. Aprobar + Asignar → Archivado Automático
                      ↓
3. Historial (Approved) + Notificaciones enviadas
                      ↓
4. Solicitudes Activas: VACÍA ✅

FLUJO RECHAZO:

1. Nueva Solicitud → Solicitudes Activas (Pendiente)
                      ↓
2. Rechazar → Archivado Automático
                      ↓
3. Historial (Canceled)
                      ↓
4. Solicitudes Activas: VACÍA ✅
```

---

**¡LISTO PARA PROBAR!** 🚀

Sigue los pasos en orden y marca cada checklist. Si todo funciona correctamente, el sistema está validado.

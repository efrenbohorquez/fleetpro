# 📥 Guía de Importación de Solicitudes desde Microsoft Forms

## 🎯 Propósito

Esta funcionalidad permite importar automáticamente las solicitudes de transporte que llegan desde el formulario de Microsoft Forms directamente a FleetPro.

---

## 📁 Ubicación del Archivo Excel

El archivo de respuestas de Microsoft Forms se encuentra en:
```
D:\Solicitud transporte personería (1-35).xlsx
```

---

## 🚀 Cómo Importar Solicitudes

### Paso 1: Descargar Respuestas de Microsoft Forms

1. **Abrir Microsoft Forms:**
   - Ir a: https://forms.office.com/
   - Seleccionar el formulario "Solicitud transporte personería"

2. **Descargar respuestas:**
   - Clic en pestaña **"Respuestas"**
   - Clic en botón **"Abrir en Excel"** o **"Descargar respuestas"**
   - Guardar en: `D:\Solicitud transporte personería (1-35).xlsx`

### Paso 2: Importar en FleetPro

1. **Abrir FleetPro:**
   ```
   http://localhost:5173
   ```

2. **Ir a "Mis Solicitudes"**

3. **Clic en el botón morado "Importar":**
   - Título: "Importar"
   - Subtítulo: "Cargar solicitudes desde Excel"
   - 📊 Icono de archivo

4. **Seleccionar archivo:**
   - Clic en **"Seleccionar archivo Excel de Microsoft Forms"**
   - Navegar a: `D:\Solicitud transporte personería (1-35).xlsx`
   - Seleccionar y abrir

5. **Vista Previa:**
   - El sistema mostrará las primeras 5 solicitudes
   - Verificar que los datos se vean correctos:
     - ✅ Solicitante
     - ✅ Dependencia
     - ✅ Origen y Destino
     - ✅ Pasajeros
     - ✅ Motivo

6. **Confirmar Importación:**
   - Clic en **"📥 Importar X Solicitudes"**
   - Las solicitudes se agregarán al sistema con estado **PENDIENTE**

---

## 📊 Mapeo de Columnas

El sistema mapea automáticamente las columnas del formulario de Microsoft Forms a los campos de FleetPro:

| Columna Microsoft Forms | Campo FleetPro | Requerido |
|------------------------|----------------|-----------|
| **Marca temporal** | Fecha de solicitud | ✅ |
| **Nombre del Solicitante** o **Nombre** | Solicitante | ✅ |
| **Correo electrónico** o **Email** | Email del Solicitante | ✅ |
| **Dependencia** o **Área** | Dependencia | ✅ |
| **Email de la Dependencia** | Email de la Dependencia | ⬜ |
| **Fecha de Salida** o **Fecha programada** | Fecha de Salida | ✅ |
| **Origen** o **Lugar de Origen** | Origen | ✅ |
| **Destino** o **Lugar de Destino** | Destino | ✅ |
| **Número de Pasajeros** o **Pasajeros** | N° de Pasajeros | ✅ |
| **Motivo del Desplazamiento** o **Motivo** | Motivo del Viaje | ✅ |
| **Observaciones adicionales** | Observaciones | ⬜ |

---

## ⚙️ Configuración del Formulario de Microsoft Forms

Para que la importación funcione correctamente, asegúrate de que tu formulario tenga estas preguntas:

### Preguntas Obligatorias:

1. **Nombre del Solicitante** (Texto)
2. **Correo electrónico** (Email)
3. **Dependencia** (Texto o Selección)
4. **Fecha de Salida** (Fecha)
5. **Origen** (Texto)
6. **Destino** (Texto)
7. **Número de Pasajeros** (Número)
8. **Motivo del Desplazamiento** (Texto largo)

### Preguntas Opcionales:

- Email de la Dependencia
- Observaciones adicionales

---

## 🔄 Flujo Completo Diario

```
1️⃣ DESCARGAR RESPUESTAS (Cada mañana)
   ├─ Abrir Microsoft Forms
   ├─ Ir a "Respuestas"
   ├─ Descargar Excel actualizado
   └─ Guardar en D:\Solicitud transporte personería...

2️⃣ ABRIR FLEETPRO
   ├─ Iniciar servidor: npm run dev
   └─ Abrir: http://localhost:5173

3️⃣ IMPORTAR SOLICITUDES
   ├─ Ir a "Mis Solicitudes"
   ├─ Clic en "Importar" (botón morado)
   ├─ Seleccionar archivo Excel
   ├─ Revisar vista previa
   └─ Confirmar importación

4️⃣ PROCESAR SOLICITUDES
   ├─ Las nuevas solicitudes aparecen como PENDIENTES
   ├─ Revisar cada una
   ├─ Aprobar/Rechazar según corresponda
   └─ Asignar vehículo y conductor

5️⃣ NOTIFICAR
   ├─ Marcar "Enviar notificación por email"
   └─ Conductor recibe email automáticamente
```

---

## ⚠️ Solución de Problemas

### ❌ "No se encontraron datos para importar"

**Causas posibles:**
1. Archivo Excel vacío
2. Excel sin encabezados correctos
3. Formato de archivo incorrecto

**Solución:**
- Verificar que el archivo tenga datos
- Asegurarse de descargar desde Microsoft Forms
- Verificar que sea archivo .xlsx o .xls

---

### ❌ "Los datos no se ven correctos en la vista previa"

**Causa:** Nombres de columnas diferentes

**Solución:**
1. Verificar nombres de columnas en Excel
2. Actualizar mapeo en `ImportRequests.tsx` si es necesario:

```typescript
// Líneas 46-58 en ImportRequests.tsx
requester: row['Nombre del Solicitante'] || row['Nombre'] || ...
requesterEmail: row['Correo electrónico'] || row['Email'] || ...
// etc.
```

---

### ❌ "Fechas se importan incorrectamente"

**Causa:** Formato de fecha de Excel

**Solución:**
El sistema intenta convertir automáticamente:
- Números de serie de Excel
- Formatos de texto
- ISO 8601

Si persiste, verificar que Microsoft Forms esté configurado con tipo de campo **Fecha**.

---

## 📌 Recomendaciones

### 1. Importación Diaria

**Mejor práctica:**
- Descargar respuestas UNA VEZ por día (en la mañana)
- Importar todas las nuevas solicitudes de una vez
- Procesar durante el día

**Evitar:**
- ❌ Importar el mismo archivo varias veces (crea duplicados)
- ❌ Mezclar importación manual y automática del mismo periodo

---

### 2. Backup del Excel

```powershell
# Crear carpeta de backups
mkdir "D:\Backups Solicitudes"

# Copiar con fecha
Copy-Item "D:\Solicitud transporte personería (1-35).xlsx" `
  -Destination "D:\Backups Solicitudes\Solicitudes_$(Get-Date -Format 'yyyy-MM-dd').xlsx"
```

---

### 3. Verificación Post-Importación

Después de importar, verificar:

- [ ] Cantidad de solicitudes importadas es correcta
- [ ] Todos los solicitantes tienen email
- [ ] Todas las dependencias están completas
- [ ] Fechas de salida son futuras (no pasadas)
- [ ] Motivos de viaje están claros
- [ ] Número de pasajeros es razonable

---

## 🔧 Personalización Avanzada

### Modificar Mapeo de Columnas

Si tus columnas de Microsoft Forms tienen nombres diferentes:

1. **Abrir archivo:**
   ```
   d:\FLOTA GEMINI\fleetpro\components\ImportRequests.tsx
   ```

2. **Localizar función `mapFormDataToRequest`** (línea 46)

3. **Actualizar nombres de columnas:**
   ```typescript
   requester: row['TU_NOMBRE_DE_COLUMNA'] || row['Alternativa'] || '',
   ```

4. **Guardar y recargar FleetPro**

---

### Agregar Validaciones Personalizadas

Agregar después de la línea 98:

```typescript
const handleImport = () => {
  if (preview.length === 0) {
    setError('No hay datos para importar');
    return;
  }

  // ✅ VALIDACIÓN PERSONALIZADA
  const hasInvalidEmails = preview.some(row => {
    const email = row['Correo electrónico'] || '';
    return !email.includes('@');
  });

  if (hasInvalidEmails) {
    setError('Algunas solicitudes tienen emails inválidos');
    return;
  }

  // Continuar con importación...
  try {
    const mappedRequests = preview.map(mapFormDataToRequest);
    // ...
```

---

## 📊 Estadísticas de Importación

El sistema mostrará en consola:

```javascript
📊 Datos del Excel: Array(35) [ {...}, {...}, ... ]
✅ Solicitudes mapeadas: Array(35) [ {...}, {...}, ... ]
✅ 35 solicitudes importadas
```

Para ver:
1. Presionar **F12** en el navegador
2. Ir a pestaña **Console**
3. Ver detalles de importación

---

## 🎓 Video Tutorial (Próximamente)

Se creará un video paso a paso mostrando:
1. Configuración de Microsoft Forms
2. Descarga de respuestas
3. Importación en FleetPro
4. Procesamiento de solicitudes
5. Solución de problemas comunes

---

## ✅ Checklist de Primera Importación

- [ ] Formulario de Microsoft Forms configurado
- [ ] Archivo Excel descargado en D:\
- [ ] FleetPro abierto (npm run dev)
- [ ] Botón "Importar" visible en menú
- [ ] Archivo Excel seleccionado
- [ ] Vista previa correcta
- [ ] Solicitudes importadas exitosamente
- [ ] Verificación de datos completa
- [ ] Backup del Excel creado

---

## 📞 Soporte

Si encuentras problemas:
1. Revisar esta guía completa
2. Verificar consola del navegador (F12)
3. Revisar archivo Excel original
4. Contactar soporte técnico

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Archivo de ejemplo:** `D:\Solicitud transporte personería (1-35).xlsx`

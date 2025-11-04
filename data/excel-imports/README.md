# 📂 Carpeta de Archivos Excel para Importación

Esta carpeta contiene los archivos Excel exportados desde Microsoft Forms para importar solicitudes de transporte.

## 📋 Uso

1. **Descargar** el archivo Excel desde Microsoft Forms
2. **Guardar** en esta carpeta con un nombre descriptivo
3. **Importar** desde la interfaz de FleetPro

## 📝 Convención de Nombres Sugerida

```
solicitud-transporte-YYYY-MM-DD.xlsx
```

Ejemplo:
- `solicitud-transporte-2025-11-03.xlsx`
- `solicitud-transporte-2025-11-04.xlsx`

## ⚠️ Notas Importantes

- **No usar caracteres especiales** en nombres de archivo (evitar tildes, ñ, etc.)
- **Usar guiones** en lugar de espacios
- **Mantener orden cronológico** con fechas en formato YYYY-MM-DD
- Los archivos en esta carpeta **no se suben a Git** (están en .gitignore)

## 🗑️ Limpieza

Se recomienda:
- Mantener archivos de los últimos 30 días
- Archivar o eliminar archivos antiguos mensualmente
- Crear respaldo en OneDrive/SharePoint si es necesario

## 📊 Formato Esperado

El archivo Excel debe contener estas columnas:

| Columna | Descripción |
|---------|-------------|
| **NOMBRE SOLICITANTE** | Nombre completo y cargo |
| **CORREO INSTITUCIONAL** | Email institucional |
| **DEPENDENCIA** | Nombre de la dependencia |
| **FECHA DEL SERVICIO** | Fecha programada |
| **HORA INICIO** | Hora de inicio del servicio |
| **HORA FINALIZACIÓN** | Hora de finalización |
| **DESCRIPCIÓN DEL SERVICIO** | Motivo detallado |
| **TELÉFONO DE CONTACTO** | Teléfono de contacto |

Para más información, consulta [IMPORTACION_EXCEL.md](../../IMPORTACION_EXCEL.md)

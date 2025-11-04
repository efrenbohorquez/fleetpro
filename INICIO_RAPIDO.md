# 🚀 Guía de Inicio Rápido - FleetPro

## Para Iniciar el Sistema Cada Día

### ⚡ Opción 1: Trabajo Local (Misma PC)

**1. Abrir PowerShell en la carpeta del proyecto:**
```powershell
cd "D:\FLOTA GEMINI\fleetpro"
```

**2. Iniciar el servidor:**
```powershell
npm run dev
```

**3. Abrir navegador:**
```
http://localhost:5173
```

✅ **Listo para trabajar!**

---

### 🌐 Opción 2: Acceso desde Celular/Tablet (Red Local)

**1. Iniciar servidor (en tu PC):**
```powershell
cd "D:\FLOTA GEMINI\fleetpro"
npm run dev
```

**2. Ver tu IP:**
```powershell
ipconfig
```
- Buscar: "Adaptador de LAN inalámbrica"
- Anotar la IPv4 (ejemplo: `192.168.2.5`)

**3. En celular/tablet (conectado a la MISMA WiFi "STARK 5G"):**
```
http://192.168.2.5:5173
```

✅ **Acceso desde dispositivos móviles en tu oficina!**

---

### 🌍 Opción 3: Acceso desde Internet (Trabajo Remoto)

**Cuando necesites trabajar desde casa o que alguien acceda desde otro lugar:**

#### Terminal 1 - Servidor Vite:
```powershell
cd "D:\FLOTA GEMINI\fleetpro"
npm run dev
```

#### Terminal 2 - ngrok (NUEVA PowerShell):
```powershell
ngrok http 5173
```

**Copiar la URL que aparece:**
```
https://algo-aleatorio.ngrok-free.dev
```

**Compartir esa URL** con quien necesite acceder.

⚠️ **IMPORTANTE:** La URL de ngrok cambia cada vez que lo reinicias.

---

## 📋 Checklist Antes de Trabajar

### Verificaciones Rápidas:

- [ ] PC conectada a WiFi "STARK 5G"
- [ ] PowerShell abierta en carpeta del proyecto
- [ ] Comando `npm run dev` ejecutado
- [ ] Navegador abierto en `http://localhost:5173`
- [ ] (Opcional) ngrok corriendo si necesitas acceso remoto

---

## 🛠️ Comandos Útiles

### Ver si el servidor está corriendo:
```powershell
Get-Process -Name node
```

### Detener el servidor:
```
Ctrl + C
```
(En la terminal donde está corriendo)

### Forzar cierre si se quedó colgado:
```powershell
Stop-Process -Name node -Force
```

### Ver tu IP actual:
```powershell
ipconfig
```

### Ver puertos en uso:
```powershell
netstat -ano | findstr :5173
```

---

## 📱 Flujo de Trabajo Recomendado

### Para Pruebas Locales (Tú solo):
```
1. Abrir PowerShell
2. cd "D:\FLOTA GEMINI\fleetpro"
3. npm run dev
4. Abrir: http://localhost:5173
5. Trabajar normalmente
6. Al terminar: Ctrl+C
```

### Para Pruebas con Otros Usuarios (Misma Oficina):
```
1. Todos conectados a WiFi "STARK 5G"
2. En tu PC: npm run dev
3. Compartir: http://192.168.2.5:5173
4. Ellos abren esa URL en sus dispositivos
5. Trabajar colaborativamente
6. Al terminar: Ctrl+C
```

### Para Pruebas Remotas (Desde Casa):
```
Terminal 1: npm run dev
Terminal 2: ngrok http 5173
Copiar URL de ngrok
Compartir con usuarios remotos
Al terminar: Ctrl+C en ambas terminales
```

---

## 🔧 Solución de Problemas Comunes

### ❌ "Puerto 5173 ya en uso"

**Solución:**
```powershell
Stop-Process -Name node -Force
npm run dev
```

---

### ❌ "No puedo acceder desde mi celular"

**Verificar:**
1. ✅ PC y celular en misma WiFi ("STARK 5G")
2. ✅ Firewall permite puerto 5173
3. ✅ IP correcta (usa `ipconfig`)
4. ✅ Servidor corriendo (`npm run dev`)

**Probar:**
```powershell
# En tu PC, verificar firewall:
Get-NetFirewallRule -DisplayName "VITE DEV SERVER"
```

---

### ❌ "ngrok dice endpoint offline"

**Solución:**
```powershell
# 1. Asegurar que Vite esté corriendo primero
npm run dev

# 2. En OTRA terminal, iniciar ngrok
ngrok http 5173
```

**Orden correcto:**
1. Primero: Vite
2. Después: ngrok

---

### ❌ "Error de compilación al iniciar"

**Solución:**
```powershell
# Limpiar y reinstalar:
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

---

## 📊 Escenarios de Prueba

### Escenario 1: Pruebas Individuales
**Usuario:** Solo tú  
**Acceso:** `http://localhost:5173`  
**Requisitos:** Solo tu PC  
**Ventaja:** Más rápido  

### Escenario 2: Pruebas con Equipo Local
**Usuarios:** Varios en oficina  
**Acceso:** `http://192.168.2.5:5173`  
**Requisitos:** Todos en WiFi "STARK 5G"  
**Ventaja:** Pruebas colaborativas  

### Escenario 3: Demostración Remota
**Usuarios:** Personas fuera de oficina  
**Acceso:** `https://xxx.ngrok-free.dev`  
**Requisitos:** PC encendida, ngrok corriendo  
**Ventaja:** Acceso desde cualquier lugar  

---

## 🎯 Plan de Pruebas Sugerido

### Día 1 - Pruebas Básicas (Local)
```
✓ Crear solicitud de transporte
✓ Aprobar/Rechazar solicitudes
✓ Asignar vehículo y conductor
✓ Verificar que aparezca en Historial
✓ Exportar CSV
```

### Día 2 - Pruebas de Red Local
```
✓ Acceder desde celular
✓ Crear solicitud desde tablet
✓ Aprobar desde otro PC
✓ Verificar sincronización de datos
```

### Día 3 - Pruebas Remotas (ngrok)
```
✓ Compartir URL con usuario remoto
✓ Crear solicitud desde casa
✓ Aprobar desde oficina
✓ Verificar notificaciones
```

---

## 📝 Tareas Pendientes para Producción

### Corto Plazo (Esta Semana):
- [ ] Probar todas las funcionalidades
- [ ] Capacitar a usuarios principales
- [ ] Documentar procesos específicos
- [ ] Crear cuentas de conductor con emails

### Mediano Plazo (Próximo Mes):
- [ ] Desplegar en servidor Ubuntu
- [ ] Configurar base de datos compartida
- [ ] Implementar autenticación de usuarios
- [ ] Configurar servicio de email

### Largo Plazo (3 Meses):
- [ ] Reportes automáticos
- [ ] Dashboard de estadísticas avanzadas
- [ ] App móvil nativa
- [ ] Integración con sistemas externos

---

## 🔐 Seguridad y Backups

### Backup Manual Diario:
```powershell
# Exportar historial a CSV (desde la app)
# Guardar en carpeta segura
```

### Backup del Código:
```powershell
git add .
git commit -m "Cambios del día"
git push
```

### Datos del Sistema:
Los datos están en **localStorage** del navegador.

⚠️ **IMPORTANTE:** Hasta implementar base de datos:
- No limpiar caché del navegador
- Usar el mismo navegador siempre
- Exportar CSV regularmente

---

## 📞 Contactos de Soporte

### Problemas Técnicos:
- **Documentación:** Ver archivos .md en el proyecto
- **Manual de Usuario:** `MANUAL_USUARIO.md`
- **Despliegue:** `DESPLIEGUE.md`
- **ngrok:** `NGROK_SETUP.md`
- **Pruebas:** `PRUEBAS_SISTEMA.md`

---

## ⏰ Resumen: Inicio en 2 Minutos

```powershell
# 1. Abrir PowerShell
cd "D:\FLOTA GEMINI\fleetpro"

# 2. Iniciar servidor
npm run dev

# 3. Abrir navegador
http://localhost:5173
```

**¡Listo para trabajar!** 🎉

---

## 🌟 Consejos Pro

1. **Deja las terminales abiertas** mientras trabajas
2. **No cierres el navegador** (minimízalo si necesitas)
3. **Guarda cambios frecuentemente** (localStorage persiste)
4. **Exporta CSV al final del día** (backup de datos)
5. **Anota la IP si cambias de WiFi** (puede variar)

---

## 📚 Documentación Completa

- 📘 **MANUAL_USUARIO.md** - Guía completa de uso
- 🚀 **DESPLIEGUE.md** - Opciones de despliegue
- 🌐 **NGROK_SETUP.md** - Configuración de acceso remoto
- ✅ **PRUEBAS_SISTEMA.md** - Casos de prueba
- 🔄 **PRUEBA_SOLICITUDES_PASO_A_PASO.md** - Flujo de solicitudes

---

**Última actualización:** Enero 2025  
**Versión del Sistema:** 1.5.0

---

## 🎯 ¿Listo para Mañana?

### Checklist Final:

- [x] Sistema funcionando correctamente
- [x] Git actualizado con todos los cambios
- [x] Documentación completa creada
- [x] ngrok configurado
- [x] Firewall configurado
- [x] IPs identificadas
- [ ] Revisar esta guía mañana antes de empezar

**¡Todo listo para trabajar mañana!** 🚀

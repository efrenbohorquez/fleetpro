# 🌐 Configuración de ngrok para FleetPro

## ¿Qué es ngrok?

ngrok es un servicio que crea un túnel seguro desde internet hacia tu aplicación local, permitiendo acceso desde cualquier lugar sin necesidad de configurar routers o firewalls.

---

## 🚀 Pasos de Configuración

### 1️⃣ Crear Cuenta en ngrok (Gratis)

1. **Ir a:** https://ngrok.com/
2. **Clic en:** "Sign up" (Registrarse)
3. **Opciones:**
   - Registrar con Google
   - Registrar con GitHub
   - O crear cuenta con email

4. **Plan:** Seleccionar **FREE** (Gratis)
   - ✅ 1 usuario
   - ✅ 1 dominio estático
   - ✅ Conexiones ilimitadas
   - ✅ Sin límite de tiempo

---

### 2️⃣ Obtener Token de Autenticación

1. **Después de registrarte**, serás redirigido al dashboard
2. **Ir a:** "Your Authtoken" o "Getting Started"
3. **Copiar** tu token (se ve así):
   ```
   2abc123def456ghi789jkl012mno345pqr_6stu789vwxyz012ABC
   ```

---

### 3️⃣ Configurar ngrok en tu PC

**Abrir PowerShell NUEVA (importante - la anterior no tiene ngrok en PATH)**

```powershell
# Configurar tu authtoken (reemplazar con tu token real)
ngrok config add-authtoken TU_TOKEN_AQUI
```

**Ejemplo:**
```powershell
ngrok config add-authtoken 2abc123def456ghi789jkl012mno345pqr_6stu789vwxyz012ABC
```

**Salida esperada:**
```
Authtoken saved to configuration file: C:\Users\[tu-usuario]\.ngrok2\ngrok.yml
```

---

### 4️⃣ Iniciar Túnel para FleetPro

**IMPORTANTE:** Primero asegúrate de que tu servidor Vite esté corriendo en otra terminal:
```powershell
npm run dev
```

**En una NUEVA PowerShell, ejecutar:**
```powershell
ngrok http 5173
```

**Verás algo como:**
```
ngrok                                                                           

Session Status                online
Account                       Tu Nombre (Plan: Free)
Version                       3.3.1
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040

Forwarding                    https://abc123def456.ngrok-free.app -> http://localhost:5173

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

---

### 5️⃣ Acceder desde Cualquier Lugar

**Tu URL pública es:**
```
https://abc123def456.ngrok-free.app
```

**Compartir esta URL con cualquier persona:**
- ✅ Desde cualquier país
- ✅ Desde cualquier dispositivo (móvil, tablet, PC)
- ✅ Sin necesidad de estar en tu WiFi
- ✅ Conexión segura HTTPS

**Ejemplo de uso:**
1. Tú estás en la oficina con tu PC (servidor corriendo)
2. Tu jefe está en casa
3. Le envías: `https://abc123def456.ngrok-free.app`
4. Él puede ver y usar FleetPro desde su casa

---

## ⚠️ Advertencia Importante

### Página de Advertencia de ngrok

La **primera vez** que alguien acceda a tu URL, ngrok mostrará:

```
You are about to visit: abc123def456.ngrok-free.app

This tunnel is being served from an ngrok account.

[Visit Site] [ngrok home]
```

**Esto es NORMAL y seguro.** Solo deben:
1. Clic en **"Visit Site"**
2. Ya podrán usar la aplicación

**Para evitar esta advertencia:**
- Plan ngrok Paid ($8/mes)
- O usar dominio personalizado

---

## 📊 Plan Gratuito - Límites

| Característica | Plan FREE |
|----------------|-----------|
| **Túneles simultáneos** | 1 |
| **Conexiones/minuto** | 40 |
| **Dominios** | Aleatorio (cambia cada vez) |
| **HTTPS** | ✅ Incluido |
| **Duración** | Ilimitada (mientras esté corriendo) |
| **Usuarios** | Ilimitados |

---

## 🔄 Cada Vez que Reinicies ngrok

**IMPORTANTE:** La URL cambia cada vez que detienes y vuelves a iniciar ngrok.

**Ejemplo:**
```
Primera vez:    https://abc123def456.ngrok-free.app
Segunda vez:    https://xyz789ghi012.ngrok-free.app  ← DIFERENTE
```

**Solución:**
1. **Gratis:** Enviar nueva URL cada vez
2. **Pago ($8/mes):** Dominio estático que nunca cambia

---

## 🎯 Comandos Útiles

### Ver Túneles Activos
```powershell
ngrok tunnels list
```

### Ver Dashboard Web Local
Mientras ngrok esté corriendo, abre en navegador:
```
http://localhost:4040
```

**Dashboard muestra:**
- Todas las peticiones HTTP en tiempo real
- Inspeccionar request/response
- Repetir peticiones
- Estadísticas

### Detener Túnel
En la terminal de ngrok:
```
Ctrl + C
```

### Túnel con Subdominio Personalizado (Plan Paid)
```powershell
ngrok http 5173 --subdomain=fleetpro
# URL fija: https://fleetpro.ngrok.app
```

---

## 🔐 Seguridad

### Buenas Prácticas

1. **No compartir tu authtoken** - Es como tu contraseña
2. **Compartir URL solo con usuarios autorizados**
3. **Cerrar ngrok cuando no lo uses**
4. **Monitorear accesos en http://localhost:4040**

### Agregar Autenticación HTTP Básica

```powershell
ngrok http 5173 --basic-auth "usuario:contraseña"
```

**Ahora al acceder, pedirá:**
- Usuario: `usuario`
- Contraseña: `contraseña`

---

## 🆚 Comparación: Red Local vs ngrok

| Aspecto | Red Local (WiFi) | ngrok |
|---------|------------------|-------|
| **Acceso desde** | Solo tu WiFi | Todo el mundo |
| **Configuración** | Firewall, IP | Solo authtoken |
| **URL** | http://192.168.2.5:5173 | https://xxx.ngrok-free.app |
| **Seguridad** | HTTPS ❌ | HTTPS ✅ |
| **Costo** | Gratis | Gratis (con límites) |
| **Mejor para** | Oficina local | Trabajo remoto |

---

## 🔄 Flujo de Trabajo Recomendado

### En la Oficina (Mismo WiFi)
```
Usar: http://192.168.2.5:5173
Por qué: Más rápido, sin límites
```

### Trabajo Remoto / Desde Casa
```
Usar: ngrok
Por qué: Acceso desde internet
```

### Despliegue Permanente
```
Usar: Servidor Ubuntu + Cloudflare Tunnel
Por qué: Sin límites, URL fija, gratis, 24/7
```

---

## 📱 Ejemplo de Uso Real

### Escenario: Aprobación Remota de Solicitudes

**Situación:**
- Es viernes 6 PM, ya estás en casa
- Llega solicitud urgente de transporte para el lunes
- Necesitas aprobarla desde tu celular

**Solución con ngrok:**

1. **Antes de salir de la oficina:**
   ```powershell
   # Terminal 1
   npm run dev
   
   # Terminal 2 (nueva PowerShell)
   ngrok http 5173
   ```

2. **Copiar URL:**
   ```
   https://abc123.ngrok-free.app
   ```

3. **Desde tu casa (celular):**
   - Abrir navegador
   - Ir a `https://abc123.ngrok-free.app`
   - Clic "Visit Site" en advertencia de ngrok
   - Aprobar solicitud normalmente

4. **Al día siguiente en la oficina:**
   - Asignar vehículo y conductor
   - Enviar notificación al conductor

---

## 🚨 Solución de Problemas

### Error: "command not found: ngrok"

**Causa:** PowerShell vieja no tiene ngrok en PATH

**Solución:**
```powershell
# Cerrar PowerShell actual
# Abrir NUEVA PowerShell
ngrok version
```

---

### Error: "authentication failed"

**Causa:** Token no configurado o incorrecto

**Solución:**
```powershell
ngrok config add-authtoken TU_TOKEN_CORRECTO
```

---

### Error: "Tunnel xxx.ngrok.io not found"

**Causa:** Servidor Vite no está corriendo en puerto 5173

**Solución:**
```powershell
# En otra terminal primero:
npm run dev

# Luego iniciar ngrok:
ngrok http 5173
```

---

### Página muy lenta al acceder

**Causa:** Plan gratuito tiene servidor en USA

**Opciones:**
1. Esperar (solo es lento al cargar, luego es normal)
2. Plan Paid permite elegir región
3. Usar Cloudflare Tunnel (gratis, servidores globales)

---

## 💰 Planes de ngrok

### FREE (Actual)
- ✅ Gratis para siempre
- ✅ 1 túnel simultáneo
- ✅ HTTPS incluido
- ⚠️ URL aleatoria
- ⚠️ Página de advertencia

### Personal ($8/mes)
- ✅ 3 túneles simultáneos
- ✅ Dominios estáticos (URL nunca cambia)
- ✅ Sin página de advertencia
- ✅ Autenticación OAuth
- ✅ Mejor soporte

### Pro ($20/mes)
- ✅ Todo lo anterior
- ✅ 10 túneles
- ✅ Dominios personalizados
- ✅ IP whitelisting

---

## 🎓 Resumen Rápido

```powershell
# 1. Instalar (YA HECHO)
winget install Ngrok.Ngrok

# 2. Configurar authtoken (SOLO UNA VEZ)
ngrok config add-authtoken TU_TOKEN_DE_NGROK

# 3. Iniciar servidor Vite (TERMINAL 1)
npm run dev

# 4. Iniciar ngrok (TERMINAL 2 - NUEVA POWERSHELL)
ngrok http 5173

# 5. Copiar URL y compartir
# https://xxx.ngrok-free.app
```

---

## 📞 Soporte ngrok

- 📖 Documentación: https://ngrok.com/docs
- 💬 Comunidad: https://github.com/inconshreveable/ngrok
- 📧 Soporte: support@ngrok.com

---

## ✅ Checklist de Configuración

- [ ] Crear cuenta en ngrok.com
- [ ] Copiar authtoken del dashboard
- [ ] Abrir NUEVA PowerShell
- [ ] Ejecutar `ngrok config add-authtoken TU_TOKEN`
- [ ] Verificar con `ngrok version`
- [ ] Iniciar servidor: `npm run dev`
- [ ] Iniciar túnel: `ngrok http 5173`
- [ ] Copiar URL generada
- [ ] Probar acceso desde celular
- [ ] Compartir URL con usuarios autorizados
- [ ] Guardar esta guía para futuras referencias

---

**🎉 ¡Listo! Ahora FleetPro es accesible desde cualquier parte del mundo.**

---

*Última actualización: Enero 2025*

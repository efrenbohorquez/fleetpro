# 🚀 Guía de Despliegue FleetPro

## 📱 Acceso en Red Local (Desarrollo)

### URLs Disponibles
Tu aplicación está disponible en:
- **Desde esta PC**: http://localhost:5173
- **Desde otros dispositivos**: http://192.168.106.1:5173

### Requisitos
1. ✅ Servidor de desarrollo corriendo (`npm run dev`)
2. ✅ Dispositivos en la misma red WiFi
3. ✅ Firewall de Windows configurado

### Configurar Firewall de Windows

**PowerShell como Administrador:**
```powershell
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

## 🌐 Despliegue en Producción

### Opción 1: Build Local + Servidor HTTP Simple

1. **Compilar la aplicación:**
```powershell
npm run build
```

2. **Servir archivos compilados:**
```powershell
npm install -g serve
serve -s dist -p 5173
```

3. **Acceso permanente:**
   - Local: http://localhost:5173
   - Red: http://192.168.106.1:5173

### Opción 2: Despliegue en la Nube

#### **Vercel (GRATIS - Recomendado)**
```powershell
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```
✅ Obtendrás una URL pública tipo: `https://fleetpro.vercel.app`

#### **Netlify (GRATIS)**
```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Compilar
npm run build

# Desplegar
netlify deploy --prod --dir=dist
```

#### **GitHub Pages (GRATIS)**
1. Sube tu código a GitHub
2. Activa GitHub Pages en la configuración del repositorio
3. Configura `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/nombre-repo/', // Nombre de tu repositorio
})
```

### Opción 3: Servidor Local Permanente (Windows)

#### **Con IIS (Internet Information Services)**
1. Panel de Control → Programas → Activar características de Windows
2. ✅ Internet Information Services
3. Compilar: `npm run build`
4. Copiar carpeta `dist` a `C:\inetpub\wwwroot\fleetpro`
5. Configurar sitio en IIS Manager

#### **Con PM2 (Mantiene servidor corriendo)**
```powershell
# Instalar PM2
npm install -g pm2

# Compilar
npm run build

# Servir con PM2
pm2 serve dist 5173 --name fleetpro

# Guardar configuración
pm2 save
pm2 startup
```

## 📊 Comparación de Opciones

| Opción | Costo | Permanencia | Acceso Externo | Complejidad |
|--------|-------|-------------|----------------|-------------|
| Dev Server | Gratis | Temporal | Red Local | ⭐ Fácil |
| Build + Serve | Gratis | Mientras esté corriendo | Red Local | ⭐⭐ Media |
| Vercel/Netlify | Gratis | Permanente | Internet | ⭐⭐ Media |
| IIS | Gratis | Permanente | Configurable | ⭐⭐⭐ Avanzada |
| PM2 | Gratis | Permanente | Red Local | ⭐⭐ Media |

## 🔐 Consideraciones de Seguridad

### Para Uso Interno (Red Local)
✅ Configuración actual es suficiente
✅ Firewall protege de acceso externo

### Para Acceso por Internet
⚠️ Implementar autenticación (login/password)
⚠️ Usar HTTPS (certificado SSL)
⚠️ Configurar CORS correctamente
⚠️ Backup regular de datos

## 📝 Pasos Siguientes Recomendados

1. **Corto plazo (Ahora)**:
   - ✅ Usar servidor de desarrollo (`npm run dev`)
   - ✅ Acceso en red local
   - ✅ Configurar firewall

2. **Mediano plazo (Próxima semana)**:
   - 📦 Compilar producción (`npm run build`)
   - 🔧 Configurar PM2 para permanencia
   - 💾 Implementar backup de localStorage

3. **Largo plazo (Próximo mes)**:
   - 🌐 Desplegar en Vercel/Netlify
   - 🔐 Agregar sistema de autenticación
   - 🗄️ Migrar a base de datos real (MongoDB/PostgreSQL)

## 🆘 Solución de Problemas

### "No puedo acceder desde mi celular"
1. Verifica que estés en el mismo WiFi
2. Confirma que el firewall permita el puerto 5173
3. Prueba todas las IPs mostradas en la terminal
4. Desactiva temporalmente el firewall de Windows

### "Los datos no se guardan"
- Los datos se guardan en localStorage del navegador
- Cada dispositivo tiene su propia copia
- Solución: Implementar backend con base de datos

### "La aplicación es lenta"
1. Compilar para producción: `npm run build`
2. Usar `serve` en lugar de dev server
3. Optimizar imágenes y recursos

## 📞 Soporte

Para más información sobre despliegue, consulta:
- Documentación Vite: https://vitejs.dev/guide/static-deploy
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com/

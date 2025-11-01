# 🚀 Scripts de Desarrollo - Fleet Pro

## Scripts Disponibles

### 1. Lanzar Servidor
```powershell
.\dev-server.ps1
```
Limpia procesos anteriores y lanza el servidor en http://localhost:3000/

### 2. Backup Rápido
```powershell
.\backup.ps1
```
Crea respaldo de todos los archivos importantes en `BACKUPS\`

### 3. Restaurar Backup
```powershell
.\restore.ps1
```
Restaura archivos desde un backup anterior

## 📝 Uso Diario

**Antes de empezar a trabajar:**
```powershell
.\backup.ps1
```

**Para lanzar el servidor:**
```powershell
.\dev-server.ps1
```

**Si algo sale mal:**
```powershell
.\restore.ps1
```

## ⚡ Comandos Rápidos

### Reiniciar servidor manualmente:
```powershell
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
npm run dev
```

### Ver errores de compilación:
```powershell
npm run build
```

### Limpiar e instalar dependencias:
```powershell
Remove-Item node_modules -Recurse -Force
npm install
```

## 📂 Estructura de Backups

```
BACKUPS/
  └── 2025-10-31_23-46-23/
      ├── App.tsx
      ├── index.tsx
      ├── types.ts
      ├── vite.config.ts
      ├── package.json
      └── components/
          ├── VehicleRequest.tsx
          ├── Vehicles.tsx
          ├── Dashboard.tsx
          └── ...
```

## 🆘 Solución de Problemas

### El servidor no inicia
1. Ejecuta `.\dev-server.ps1`
2. Si persiste: `npm install`
3. Si aún falla: `.\restore.ps1`

### Perdí cambios recientes
1. Ejecuta `.\restore.ps1`
2. Selecciona el backup más reciente (0)
3. Reinicia el servidor

### Error de puerto ocupado
```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | 
    Select-Object -ExpandProperty OwningProcess | 
    ForEach-Object { Stop-Process -Id $_ -Force }
```

## 💡 Mejores Prácticas

1. **Haz backup ANTES de cambios importantes**
2. **Usa `.\dev-server.ps1` en lugar de `npm run dev` directo**
3. **Guarda el trabajo frecuentemente en VS Code (Ctrl+S)**
4. **Si el servidor falla, NO hagas más cambios - restaura primero**

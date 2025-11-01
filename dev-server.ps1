# Script para lanzar el servidor de desarrollo
Write-Host "Iniciando servidor..." -ForegroundColor Green

# Detener procesos Node anteriores
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Cambiar al directorio
Set-Location "d:\FLOTA GEMINI\fleetpro"

# Lanzar servidor
npm run dev


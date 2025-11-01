# Script de restauración rápida desde el último backup

$backupDir = "d:\FLOTA GEMINI\fleetpro\BACKUPS"

Write-Host "🔄 Buscando backups disponibles..." -ForegroundColor Cyan
Write-Host ""

# Obtener todos los backups ordenados por fecha
$backups = Get-ChildItem -Path $backupDir -Directory | Sort-Object Name -Descending

if ($backups.Count -eq 0) {
    Write-Host "❌ No se encontraron backups" -ForegroundColor Red
    exit 1
}

# Mostrar lista de backups
Write-Host "📋 Backups disponibles:" -ForegroundColor Cyan
for ($i = 0; $i -lt [Math]::Min(10, $backups.Count); $i++) {
    Write-Host "   [$i] $($backups[$i].Name)" -ForegroundColor White
}
Write-Host ""

# Pedir al usuario que seleccione
Write-Host "Ingresa el número del backup a restaurar (0 = más reciente): " -NoNewline -ForegroundColor Yellow
$selection = Read-Host

try {
    $selectedBackup = $backups[[int]$selection]
} catch {
    Write-Host "❌ Selección inválida" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Restaurando desde: $($selectedBackup.Name)" -ForegroundColor Cyan
Write-Host ""

# Restaurar archivos
$files = Get-ChildItem -Path $selectedBackup.FullName -Recurse -File
$successCount = 0
$failCount = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($selectedBackup.FullName.Length + 1)
    $destPath = "d:\FLOTA GEMINI\fleetpro\$relativePath"
    
    try {
        $destDir = Split-Path $destPath -Parent
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        Copy-Item $file.FullName $destPath -Force
        Write-Host "✅ $relativePath" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "❌ $relativePath - Error: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "   Restaurados: $successCount" -ForegroundColor Green
Write-Host "   Fallidos: $failCount" -ForegroundColor Red
Write-Host ""
Write-Host "✨ Restauración completada" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Ejecuta .\dev-server.ps1 para reiniciar el servidor" -ForegroundColor Yellow

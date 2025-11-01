# Backup rapido de archivos criticos
$backupDir = "d:\FLOTA GEMINI\fleetpro\BACKUPS"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupPath = Join-Path $backupDir $timestamp

Write-Host "Creando backup en: $backupPath" -ForegroundColor Green
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

# Archivos criticos
$files = @(
    "App.tsx",
    "index.tsx",
    "types.ts",
    "vite.config.ts",
    "package.json"
)

$componentFiles = Get-ChildItem "components\*.tsx" -ErrorAction SilentlyContinue

foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item $file $backupPath -Force
        Write-Host "OK: $file" -ForegroundColor Gray
    }
}

$compDir = Join-Path $backupPath "components"
New-Item -ItemType Directory -Path $compDir -Force | Out-Null

foreach ($file in $componentFiles) {
    Copy-Item $file.FullName $compDir -Force
    Write-Host "OK: components\$($file.Name)" -ForegroundColor Gray
}

Write-Host "Backup completado!" -ForegroundColor Green


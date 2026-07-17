Write-Host ""
Write-Host "Reconstruyendo proyecto..." -ForegroundColor Cyan

docker compose down --volumes --remove-orphans

docker compose build --no-cache

docker compose up -d
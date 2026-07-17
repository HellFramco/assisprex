Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   LIMPIEZA COMPLETA DE DOCKER" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""


docker compose down --volumes --remove-orphans

Write-Host "1. Eliminando contenedores detenidos..." -ForegroundColor Yellow
docker container prune -f

Write-Host ""
Write-Host "Eliminar todos los contenedores..." -ForegroundColor Yellow
docker rm -f $(docker ps -aq)

Write-Host ""
Write-Host "Eliminar todas las imágenes..." -ForegroundColor Yellow
docker rmi -f $(docker images -aq)

Write-Host ""
Write-Host "Eliminar todos los volúmenes..." -ForegroundColor Yellow
docker volume rm $(docker volume ls -q)

Write-Host "`n[5/7] Eliminando cache de BuildKit..." -ForegroundColor Yellow
docker builder prune -af

Write-Host "`n[6/7] Eliminando cache de Buildx..." -ForegroundColor Yellow
docker buildx prune -af

Write-Host ""
Write-Host "2. Eliminando imágenes no utilizadas..." -ForegroundColor Yellow
docker image prune -a -f

Write-Host ""
Write-Host "3. Eliminando volúmenes..." -ForegroundColor Yellow
docker volume prune -f

Write-Host ""
Write-Host "4. Eliminando redes..." -ForegroundColor Yellow
docker network prune -f

Write-Host ""
Write-Host "5. Eliminando caché del builder..." -ForegroundColor Yellow
docker builder prune -af

Write-Host ""
Write-Host "6. Ejecutando limpieza completa..." -ForegroundColor Yellow
docker system prune -a --volumes -f

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "      LIMPIEZA FINALIZADA" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""


Write-Host ""
Write-Host "Reconstruyendo proyecto..." -ForegroundColor Cyan

docker compose down --volumes --remove-orphans

docker compose build --no-cache

docker compose up -d
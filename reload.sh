#!/bin/bash

echo ""
echo "=========================================="
echo "   LIMPIEZA COMPLETA DE DOCKER"
echo "=========================================="
echo ""

docker compose down --volumes --remove-orphans

echo "1. Eliminando contenedores detenidos..."
docker container prune -f

echo ""
echo "Eliminar todos los contenedores..."
CONTAINERS=$(docker ps -aq)
if [ -n "$CONTAINERS" ]; then
    docker rm -f $CONTAINERS
fi

echo ""
echo "Eliminar todas las imágenes..."
IMAGES=$(docker images -aq)
if [ -n "$IMAGES" ]; then
    docker rmi -f $IMAGES
fi

echo ""
echo "Eliminar todos los volúmenes..."
VOLUMES=$(docker volume ls -q)
if [ -n "$VOLUMES" ]; then
    docker volume rm $VOLUMES
fi

echo ""
echo "[5/7] Eliminando cache de BuildKit..."
docker builder prune -af

echo ""
echo "[6/7] Eliminando cache de Buildx..."
docker buildx prune -af

echo ""
echo "2. Eliminando imágenes no utilizadas..."
docker image prune -a -f

echo ""
echo "3. Eliminando volúmenes..."
docker volume prune -f

echo ""
echo "4. Eliminando redes..."
docker network prune -f

echo ""
echo "5. Eliminando caché del builder..."
docker builder prune -af

echo ""
echo "6. Ejecutando limpieza completa..."
docker system prune -a --volumes -f

echo ""
echo "=========================================="
echo "      LIMPIEZA FINALIZADA"
echo "=========================================="
echo ""

echo ""
echo "Reconstruyendo proyecto..."

docker compose down --volumes --remove-orphans
docker compose build --no-cache
docker compose up -d
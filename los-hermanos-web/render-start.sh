#!/bin/bash

echo "==> Prueba de Script (Exitoso) <=="

# Intenta correr el comando más simple para asegurar que el shell funcione
ls -la /var/www

# Simula el proceso principal con un servidor HTTP simple
exec php -S 0.0.0.0:9000 -t public
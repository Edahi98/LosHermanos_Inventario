# ===============================================
# ETAPA 1: COMPILACIÓN DE ASSETS (Frontend)
# ===============================================
FROM node:20 as node_builder

WORKDIR /app

# Instalar dependencias necesarias de Linux y PHP para Composer
RUN apt-get update && apt-get install -y \
    git \
    curl \
    php-cli \
    php-mbstring \
    php-xml \
    unzip \
    && rm -rf /var/lib/apt/lists/*
    
# Instalar Composer Globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia los archivos de configuración
COPY package.json package-lock.json ./
COPY composer.json composer.lock ./
COPY resources/ ./resources/
COPY artisan ./
# === CORRECCIÓN: Copiar configuración de Vite para que sepa qué compilar ===
COPY vite.config.js ./
# ===========================================================================

# Instala dependencias de Node
RUN npm install

# Deshabilita scripts para evitar el error 'bootstrap/app.php'
RUN composer install --no-dev --prefer-dist --no-scripts

# Compila los assets de frontend (Tailwind CSS, JS)
RUN npm run build 

# ===============================================
# ETAPA 2: APLICACIÓN FINAL (PHP-FPM)
# ===============================================
FROM php:8.4.7-fpm

# Instalar dependencias del sistema (PostgreSQL y utilidades de Laravel)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de PHP
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd zip

# Obtener Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo de Laravel
WORKDIR /var/www

# CONFIGURACIÓN DE PHP-FPM
COPY docker/fpm/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf

# Copiar y dar permisos al script de inicio
COPY render-start.sh /usr/local/bin/render-start.sh
RUN chmod +x /usr/local/bin/render-start.sh

# Copiar todo el código de la aplicación
COPY . .

# COPIAR ASSETS COMPILADOS DESDE LA ETAPA DE NODE
COPY --from=node_builder /app/public public/

# Instalar dependencias de Composer finales
RUN composer install --no-dev --prefer-dist --optimize-autoloader

# Configurar permisos finales
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# CMD FINAL
CMD ["/usr/local/bin/render-start.sh"]
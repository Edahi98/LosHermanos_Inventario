# Llama a la imagen de deno
FROM denoland/deno:alpine

# Configuración de conexión a la base de datos

ENV DB_NAME=""
ENV DB_PASSWORD=""
ENV DB_PORT=""
ENV DB_USER=""

# Se establece el directorio de trabajo a donde se va a copiar todo el codigo fuente
WORKDIR /microservicio_los_hernanos
COPY . /microservicio_los_hernanos

# Especifica el puerto
EXPOSE 5577

CMD [ "deno", "--allow-all", "src/app.ts" ]

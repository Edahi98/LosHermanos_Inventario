# Llama a la imagen de deno
FROM denoland/deno:alpine

# Se establece el directorio de trabajo a donde se va a copiar todo el codigo fuente
WORKDIR /app
COPY . /app

# Especifica el puerto
EXPOSE 3000

# Instala dependencias
RUN deno cache --reload index.ts

CMD ["deno", "run", "--allow-all", "index.ts"]

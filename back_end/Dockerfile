FROM node:20-slim

WORKDIR /app

# 1. Instala OpenSSL e 'dos2unix' (para corrigir quebras de linha)
RUN apt-get update -y && apt-get install -y openssl dos2unix

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate

EXPOSE 8080

# Copia o script de entrada
COPY ./docker-entrypoint.sh /usr/local/bin/

# 2. Converte o script para formato Unix (LF) e adiciona permissão de execução
RUN dos2unix /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"] 

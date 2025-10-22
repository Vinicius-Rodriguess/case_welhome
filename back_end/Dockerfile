FROM node:20-slim

WORKDIR /app

# Instala OpenSSL antes de tudo
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Gera o Prisma Client dentro do container (após instalar o OpenSSL)
RUN npx prisma generate

EXPOSE 8080

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]
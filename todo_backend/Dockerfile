FROM node:14

# Limpia el cache npm para por posibles problemas de dependencias corruptas
RUN npm cache clean --force


WORKDIR /app

# Copia package.json y package-lock.json desde src/
COPY ./src/package.json /app/package.json
COPY ./src/package-lock.json /app/package-lock.json

RUN npm install --save-dev prisma @prisma/client

RUN npm i -g nodemon

# Esto sirve mas que nada para produccion, para desarrollo es mejor usar volumes, declarado en el compose
# COPY ./src /app

EXPOSE 5000

CMD ["nodemon", "src/index.js"]

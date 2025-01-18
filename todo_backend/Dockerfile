FROM node:latest

# Limpia el cache npm para por posibles problemas de dependencias corruptas
RUN npm cache clean --force


WORKDIR /app

# Copia package.json y package-lock.json desde src/
COPY ./src/package.json /app/package.json
COPY ./src/package-lock.json /app/package-lock.json

RUN npm install --save-dev prisma @prisma/client

RUN npm i -g nodemon

COPY ./src /app

EXPOSE 5000

CMD ["nodemon", "src/index.js"]

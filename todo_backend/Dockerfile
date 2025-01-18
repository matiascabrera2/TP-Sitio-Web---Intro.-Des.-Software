FROM node:latest

RUN npm i -g nodemon

WORKDIR /app

COPY . /app

EXPOSE 5000

CMD ["nodemon", "src/index.js"]

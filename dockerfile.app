FROM node:20-alpine

WORKDIR /app

CMD npm i && node app/index.js
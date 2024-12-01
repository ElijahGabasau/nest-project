FROM node:20-alpine

RUN npm install -g @nestjs/cli ts-node

RUN mkdir /app
WORKDIR /app

COPY backend/package.json /app

RUN  npm i


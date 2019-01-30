FROM node:8.10.0-alpine

RUN apk upgrade
RUN apk update
RUN npm install -g serverless@1.30.0
RUN npm install -g npm-check-updates

WORKDIR /src

EXPOSE 3000

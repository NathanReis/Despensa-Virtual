FROM node:16-alpine

RUN apk update \
    && apk upgrade \
    && rm /var/cache/apk/*

RUN yarn global add expo-cli@4.13.*

COPY ./scripts /scripts-app

WORKDIR /app

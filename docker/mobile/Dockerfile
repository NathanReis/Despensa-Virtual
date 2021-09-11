FROM node:14.17-alpine

RUN apk update \
    && apk upgrade \
    && apk add nano \
    && rm /var/cache/apk/*

RUN yarn global add expo-cli

COPY ./scripts /scripts-app

WORKDIR /app

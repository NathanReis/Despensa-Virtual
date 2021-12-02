FROM node:16-alpine

RUN apk update \
    && apk upgrade \
    && rm /var/cache/apk/*

COPY ./scripts /scripts-app

WORKDIR /app

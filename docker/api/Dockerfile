FROM node:14.17-alpine

RUN apk update \
    && apk upgrade \
    && apk add nano \
    && rm /var/cache/apk/*

COPY ./scripts /scripts-app

WORKDIR /app

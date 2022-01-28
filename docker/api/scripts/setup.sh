# !/bin/sh

cd /app

yarn install

yarn typeorm schema:sync
yarn typeorm migration:run

yarn dev

# !/bin/sh

cd /app

yarn install
yarn typeorm migration:run
yarn dev

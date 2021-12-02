# !/bin/sh

cd /app

# Delete temporary files
rm -f src/temp/*

# Recreate .gitkeep
touch src/temp/.gitkeep

export GOOGLE_APPLICATION_CREDENTIALS="src/secrets/googleCredentials.json"

yarn typeorm schema:sync
yarn typeorm migration:run

yarn install

yarn dev

# !/bin/sh

cd /app

# Delete temporary files
rm -f src/temp/*

# Recreate .gitkeep
touch src/temp/.gitkeep

yarn install
yarn typeorm migration:run
yarn dev

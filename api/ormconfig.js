let ormConfig = {
  type: "postgres",
  "synchronize": true,
  entities: [
    "./src/entity/*.ts"
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  cli: {
    "migrationsDir": "./src/database/migrations/"
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

if (process.env.ENV === "prod") {
  ormConfig = Object.assign(ormConfig, {
    url: process.env.DB_URL_PROD
  });
} else {
  ormConfig = Object.assign(ormConfig, {
    url: process.env.DB_URL_DEV
  });
}

module.exports = ormConfig;

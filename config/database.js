const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  const pgDefaultHerokuSettings = {
    connector: "bookshelf",
    settings: {
      client: "postgres",
      host,
      port,
      database,
      user,
      password,
      ssl: { rejectUnauthorized: false },
    },
    options: {
      ssl: false,
    },
  };

  return {
    defaultConnection: "default",
    connections: {
      default:
        process.env.NODE_ENV === "development"
          ? pgDefaultHerokuSettings
          : {
              connector: "bookshelf",
              settings: {
                client: "postgres",
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                database: process.env.DATABASE_NAME,
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
              },
              options: {},
            },
    },
  };
};

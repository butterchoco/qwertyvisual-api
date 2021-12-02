const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  return {
    defaultConnection: "default",
    connections: {
      default:
        env("NODE_ENV") === "development"
          ? {
              connector: "bookshelf",
              settings: {
                client: "postgres",
                host,
                port,
                database,
                username: user,
                password,
                ssl: { rejectUnauthorized: false },
              },
              options: {
                ssl: false,
              },
            }
          : {
              connector: "bookshelf",
              settings: {
                client: "mysql",
                host: env("DATABASE_HOST", "localhost"),
                port: env.int("DATABASE_PORT", 3306),
                database: env("DATABASE_NAME", "strapi"),
                username: env("DATABASE_USERNAME", "strapi"),
                password: env("DATABASE_PASSWORD", "strapi"),
              },
              options: {},
            },
    },
  };
};

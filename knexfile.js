module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "crud-webstore",
      user: "postgres",
      password: "postgres"
    }
  },
  test: {
    client: "pg",
    connection: {
      database: "test-crud-webstore",
      user: "postgres",
      password: "postgres"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};

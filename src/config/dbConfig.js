module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'idsirvan',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'idstaskmanager',
    host: process.env.HOST || 'db4free.net',
    dialect: 'mysql',
  },
};

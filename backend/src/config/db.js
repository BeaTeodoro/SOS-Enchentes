const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SOSenchentes",
  password: "3094",
  port: 5432,
});

module.exports = pool;
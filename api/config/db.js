const Pool = require("pg").Pool;
const pool = new Pool({
  user: "harsha",
  password: "postgres",
  port: "5432",
  host: "localhost",
  database: "companydata",
});

module.exports = pool;
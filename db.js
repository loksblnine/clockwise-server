const Pool = require("pg").Pool;

// DB config
const pool = new Pool(
    {
        user: "postgres",
        password: "nutter01",
        host:"localhost",
        port:"5432",
        database:"test123"
    }
)

module.exports = pool;
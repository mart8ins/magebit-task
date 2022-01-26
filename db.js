const mysql = require("mysql2");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test12345",
    database: "subscriptions",
    port: 3307,
});

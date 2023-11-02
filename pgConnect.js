const express = require('express');
require('dotenv').config();
const { Client } = require("pg");
const pgConnect = express();
const port = process.env.DB_PORT || 5000;

// user connection
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: "pglab",
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect((err) => {
    if (err) {
        console.error("connection error", err.stack);
    }
});

// get info current user and database
client.query("select current_user, current_database()", (err, res) => {
    if (err) throw err;
    console.log(res["rows"]);
    client.end();
});

pgConnect.listen(port, () => console.log(`Listening on port ${port}`));

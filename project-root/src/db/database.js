const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../notification.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log("Database Error:", err.message);
    } else {
        console.log("SQLite Connected");
    }
});

const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

db.exec(schema, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Initialized");
    }
});

module.exports = db;
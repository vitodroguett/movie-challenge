const mongoose = require("mongoose");
const db = require("../config/db");

mongoose.connect(db.uri, db.options);

const db_connection = mongoose.connection;
db_connection.on("error", console.error.bind(console, "connection error: "));
db_connection.once("open", function () {
    console.log("Connected successfully");
});

module.exports = db_connection;
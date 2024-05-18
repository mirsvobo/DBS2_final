const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

const UserRoutes = require("./routes/users");
app.use("/users", UserRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const app = express();

// Nastavení middleware pro zpracování JSON těla požadavků
app.use(bodyParser.json());

// Připojení k databázi
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();


// Spuštění serveru na portu 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});

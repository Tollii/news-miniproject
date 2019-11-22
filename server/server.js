// @flow

// Set up express server
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Reads MySQL config file
const mysql = require("mysql");
const fs = require("fs");
const raw = fs.readFileSync("config.json");
const config = JSON.parse(raw);

// Import DAO
const ArticleDao = require("./dao/articledao");
const pool = mysql.createPool(config);
const articleDao = new ArticleDao(pool);

app.get("/articles", (req, res) => {
    console.log("Received GET-request from client");
    articleDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/articles/:id", (req, res) => {
    console.log("Received GET-request from client");
    articleDao.getOne(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/articles/:id", (req, res) => {
    console.log("Recieved DELETE-request from client");
    articleDao.deleteOne(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/articles/:id", (req, res) => {
    console.log("Received PUT-request from client");
    articleDao.updateOne(req.body, req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/articles", (req, res) => {
    console.log("Received POST-request from client");
    articleDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

const server = app.listen(4000);

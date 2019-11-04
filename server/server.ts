// Set up express server
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Reads MySQL config file
const mysql = require("mysql");
const fs = require("fs");
const raw = fs.readFileSync('config.json');
const config = JSON.parse(raw);

// Import DAO
const ArticleDao = require('./dao/articledao');
const pool = mysql.createPool(config);
const articleDao = new ArticleDao(pool);

app.get('/article', (req: any, res:any) => {
  console.log("Received GET-request from client");
  articleDao.getAll( (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get('/article/:id', (req: any, res:any) => {
  console.log("Received GET-request from client");
  articleDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.delete('/article/id', (req: any, res:any) => {
  console.log("Recieved DELETE-request from client");
  articleDao.deleteOne( (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

app.put('/article/:id', (req: any, res:any) => {
  console.log("Recieved PUT-request from client");
  articleDao.updateOne(req.body, req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

const server = app.listen(4000);

const fs = require("fs");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');

// Reads MySQL config file
const raw = fs.readFileSync('config.json');
const config = JSON.parse(raw);

const pool = mysql.createPool(config);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fetches all articles, or the given article identified with article_id in the URI
app.get("/article/:id?", (req: any, res: any) => {
  console.log("Received GET-request from client");
  pool.getConnection((err: any, connection: any) => {
    console.log("Connected to database");
    if(err){
      console.log("Connection error");
      res.json({error: "Connection error"});
    } else {
      let query = "SELECT article_id, summary, title, article_text, created_at, image, priority FROM article";
      let val: number;
      if(req.params.id){
        query = `SELECT article_id, title, summary, article_text, created_at, image, priority FROM article WHERE article_id = ?`;
        val = req.params.id;
      }
      connection.query(query, val, (err: any, rows: any) => {
          connection.release();
          if(err){
            console.log(err);
            res.json({error: "Query error"});
          } else {
            console.log(rows);
            res.json(rows);
          }
        }
      );
    }
  });
});

// Creates a new article
// Format: title: string, article_text: string, importance: integer
app.post("/article", (req: any, res: any) =>{
  console.log("Received POST-request from client");
  pool.getConnection((err: any, connection: any) => {
    if(err){
      console.log("Connection error");
      res.json({error: "Connection error"});
    } else {
      console.log("Established connection to database");
      const query = "INSERT INTO article (title, summary, article_text, image, priority) VALUES (?,?,?,?,?)";
      const val = [req.body.title, req.body.summary, req.body.article_text, req.body.image, req.body.priority];
      connection.query(query, val, err => {
        connection.release();
        if(err) {
          console.log(err);
          res.status(500);
          res.json({error: "Error with INSERT"});
        } else {
          console.log("Success");
          res.send("Record has been created");
        }
      }
    );
  }
})});

// Deletes a given article identified with article_id in the URI
app.delete("/article/:id", (req: any, res: any) => {
  console.log("Recieved DELETE-request from client");
  pool.getConnection((err: any, connection: any) => {
    if(err){
      console.log("Connection error");
      res.json({error: "Connection error"});
    } else {
      console.log("Established connection to database");
      const query = `DELETE FROM article WHERE article_id = ?;`;
      const val = req.params.id;
      connection.query(query, val, err => {
        connection.release();
        if(err) {
          console.log(err);
          res.status(500);
          res.json({error: "Error with query"});
        } else {
          console.log("Success");
          res.send("Record has been deleted");
        }
      });
    }
  })
});

// Updates a given article identified with article_id in the URI
// Format: title: string, body: string, article_text: string, priority: integer
app.put("/article/:id", (req: any, res: any) => {
  console.log("Recieved PUT-request from client");
  pool.getConnection((err: any, connection: any) => {
    if(err){
      console.log("Connection error");
      res.json({error: "Connection error"});
    } else {
      console.log("Established connection to database");
      const query = `UPDATE article SET title = ?, summary = ?, article_text = ?, image = ?, priority = ? WHERE article_id = ?;`;
      const val = [req.body.title, req.body.summary, req.body.article_text, req.body.image, req.body.priority, req.params.id];
      connection.query(query, val, err => {
        connection.release();
         if(err) {
           console.log(err);
           res.status(500);
           res.json({error: "Error with INSERT"});
         } else {
           console.log("Success");
           res.send("Record has been updated");
         }
      });
    }
  });
});

const server = app.listen(4000);


console.log("hello from backend - index.js");

/**
 * Const.
 * 
 */

const cors = require("cors");
const { Client } = require('pg');

const express = require("express");     
const { request } = require("http");

const app = express();
const port = 4000;

const pgClient = new Client({
  database: "simpletodo",
  user: "postgres", 
  password: "ee49f2c1d69f42faa6f5c91dc1daa8d9"
});

console.log("DB-PAssword: " + pgClient.password)

if ( pgClient.connect()) {
    // console.log(pgClient);
    console.log("DB Host: " + pgClient.host + ":" + pgClient.port);
    console.log("Database: " + pgClient.database )
    console.log("Connection successful")
} ;

/**
 * Middleware.
 */

app.use(cors({
  origin: '*'
}));

app.use(express.json());

/**
 * Classes.
 * 
 */

class ToDo {
    id;
    title;
    task;
    due_date;
    prio;
  
    constructor(data) {
      this.id = data.id;
      this.title = data.title;  
      this.task = data.task;
      this.due_date = data.due_date;
      this.prio = data.prio;
    }
  };




  // Hello World
app.get('/', (req, res) => {
    res.send('Hello World from simpleToDo expressJS!')
  })
  
  
  /*****************************************
   * MAIN
   ****************************************/
  
  app.listen(port, () => {          // actually run server (listen on port)
    console.log(`simpleToDo Server listening on port ${port}`)
  })
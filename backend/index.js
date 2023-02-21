
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
  password: "postgres"
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

/**
 * id - title - description - due_date - priority;
 */
class ToDo {
    id;
    title;
    description;
    due_date;
    priority;
  
    constructor(data) {
      this.id = data.id;
      this.title = data.title;  
      this.description = data.description;
      this.due_date = data.due_date;
      this.priority = data.priority;
    }
  };

  // Get ToDos
  /**
   * Query DB
   * Return all ToDos
   */
  app.get('/todos', (req, res) => {
  
  })

    // Post ToDos
    /**
     * Check if Title and Description in JSON
     * ? Error ?
     * Insert into DB
     * Return Record
     */
app.post('/todos', (request, response) => {

  // var { title, description, due_date, priority } = request.body;
  // console.log (
  //   // " id: " + id +
  //   " title: " + title +
  //   " description: " + description +
  //   " due_date: " + due_date +
  //   " priority: " + priority
  //   // " typeof: " + typeof
  // )
  const toDo = new ToDo(request.body); 
    console.log (
    // " id: " + id +
    " title: " + toDo.title +
    " description: " + toDo.description +
    " due_date: " + toDo.due_date +
    " priority: " + toDo.priority +
    " typeof: " + typeof(toDo)
  )
})



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


/**
 * Const.
 * 
 */

const cors = require("cors");
const { Client } = require('pg');

const express = require("express");     
const { request } = require("http");
const { title } = require("process");

const app = express();
const port = 4000;

const pgClient = new Client({
  database: "simpletodo",
  user: "postgres", 
  password: "postgres"
});

// console.log("DB-PAssword: " + pgClient.password)

if ( pgClient.connect()) {
    // console.log("DB Host: " + pgClient.host + ":" + pgClient.port);
    // console.log("Database: " + pgClient.database )
    // console.log("Connection successful")
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

  function getTodosFromDB (req, response) {
    pgClient.query("SELECT * FROM todos ORDER BY due_date DESC",  (err, result) => {
      // console.log(result);
      response.send(result.rows);
    })
  }

  function postTodoToDB (req, response) {
    const toDo = new ToDo(req.body); 
  //   console.log (
  //   // " id: " + id +
  //   " title: " + toDo.title +
  //   " description: " + toDo.description +
  //   " due_date: " + toDo.due_date +
  //   " priority: " + toDo.priority +
  //   " typeof: " + typeof(toDo)
  // )
  if (! toDo.title || ! toDo.description) {
    console.log("title or description from form missing")
    response.status(401).send("Please enter title and description!");
  }

  const queryString = "INSERT INTO todos (title, description, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *;";
  const res = pgClient.query(queryString, [toDo.title, toDo.description, toDo.due_date, toDo.priority], (err,res) => {
    if (res.rows[0].id) { 
      response.status(201).send("Todo created!");
      console.log(res.rows[0]);  
       } 
  });
  }

// Get Todos
app.get('/todos', getTodosFromDB)

// Post Todos
app.post('/todos', postTodoToDB)


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
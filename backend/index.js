/**
 * Const.
 *
 */

const cors = require("cors");
const { Client } = require("pg");

const express = require("express");
const { request } = require("http");
const { title } = require("process");

const app = express();
const port = 4000;

const pgClient = new Client({
  database: "simpletodo",
  user: "postgres",
  password: "postgres",
});

// console.log("DB-PAssword: " + pgClient.password)

if (pgClient.connect()) {
  // console.log("DB Host: " + pgClient.host + ":" + pgClient.port);
  // console.log("Database: " + pgClient.database )
  // console.log("Connection successful")
}

/**
 * Middleware.
 */

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

/**
 * Classes.
 *
 */

/**
 * id - title - description - due_date - time - priority;
 */
class ToDo {
    id;
    title;
    description;
    due_date;
    time;
    priority;
    status;
  
    constructor(data) {
      this.id = data.id;
      this.title = data.title;  
      this.description = data.description;
      this.due_date = data.due_date;
      this.time = data.time;
      this.priority = data.priority;
      this.status=data.status;  
    }
  };

function getTodosFromDB(req, response) {

  console.log(req);
  const sortOrder = 'date-asc'
  if ( req ) { sortOrder = req; }
  console.log(sortOrder);
  
  switch (sortOrder) {
    case 'date-asc':
      orderString = " ORDER BY due_date ASC;";
    
    default:
      orderString = " ORDER BY due_date ASC;";
  }

  let selectString = "SELECT * FROM todos "

  let queryString = selectString + orderString;
  console.log(queryString);

  pgClient.query( queryString, (err, result) => {
      console.log(result.rows);
      // response.send(result.rows);
    })
  }


// ###################################################


  function deleteTodos (request, response){
    var { id } = request.body;
    const queryString = "DELETE FROM todos WHERE id = $1;";
    pgClient.query(queryString, [id], (err, result) => {
      response.status(200).send("DELETED");
      console.log("GESENDET?")
      console.log(err)
    })
    console.log("DELETE END")
  }
// ###################################################



function postTodoToDB(req, response) {
  const toDo = new ToDo(req.body);
  //   console.log (
  //   // " id: " + id +
  //   " title: " + toDo.title +
  //   " description: " + toDo.description +
  //   " due_date: " + toDo.due_date +
  //   " time: " + toDo.time +
  //   " priority: " + toDo.priority +
  //   " typeof: " + typeof(toDo)
  // )
  if (!toDo.title || !toDo.description) {
    console.log("title or description from form missing");
    response.status(401).send("Please enter title and description!");
  }

  const queryString =
    "INSERT INTO todos (title, description, due_date, time, priority, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
  const res = pgClient.query(
    queryString,
    [toDo.title, toDo.description, toDo.due_date, toDo.time, toDo.priority, toDo.status],
    (err, res) => {
      if (res.rows[0].id) {
        response.status(201).send("Todo created!");
        console.log(res.rows[0]);
      }
    }
  );
}

async function updateTodoToDB(req, res) {
  const toDo = new ToDo(req.body);
  const query = `UPDATE "todos" 
                 SET "title" = $1, "description" = $2, "priority" = $3, "due_date" = $4, "time" = $5, "status" = $6
                 WHERE "id" = $7`;
  try {
    await pgClient.query(query, [
      toDo.title,
      toDo.description,
      toDo.priority,
      toDo.due_date,
      toDo.time,
      toDo.status,
      toDo.id,
    ]); // sends queries
    res.send("OK");
  } catch (error) {
    console.error(error.stack);
  }
}

// Get Todos
app.get('/todos', (req, res) => {
  const sort = req.query.sort;
  console.log(sort)
  getTodosFromDB()
  // getTodosFromDB(sort)
  } 
);

// Post Todos
app.post('/todos', postTodoToDB)

// Delete Post
app.delete('/todos', deleteTodos)

// Hello World
app.get("/", (req, res) => {
  res.send("Hello World from simpleToDo expressJS!");
});

//Edit Todos
app.put("/todos", updateTodoToDB);

/*****************************************
 * MAIN
 ****************************************/

app.listen(port, () => {
  // actually run server (listen on port)
  console.log(`simpleToDo Server listening on port ${port}`);
});

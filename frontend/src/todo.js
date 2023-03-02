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
    this.due_date = new Date(data.due_date);
    this.time = data.time;
    this.priority = data.priority;
  }
}


function repeatcard(todo) {
  return `
  <div class="uk-card uk-card-default" uk-width-2-2@m td-container-center" style="margin-bottom: 30px;">
    <div class="uk-card-header">
      <div class="uk-grid-small uk-flex-middle" uk-grid>            
          <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">${
                      todo.title
                    }                      
                    <a href="#" onclick=
                    "localStorage.setItem('id','${todo.id}'),
                    localStorage.setItem('titles','${todo.title}'),
                    localStorage.setItem('Description','${todo.description}'), 
                    localStorage.setItem('Due_date','${todo.due_date}'),
                    localStorage.setItem('time','${todo.time}'),
                    localStorage.setItem('priority','${todo.priority}'),
                    edit()"
                    uk-toggle="target: #Edit-ToDo-modal" class="uk-icon-link"uk-icon="pencil"></a></h3>
                    <p hidden>${todo.id}</h2>                    
          </div>
      </div>
    </div>
      <div class="uk-card-body">
                  <p>Due_date: ${new Date(
                    todo.due_date
                  ).toLocaleDateString()}</p>
                  <p>Time :${todo.time}</p>
                  <p>Description:${todo.description}</p>
                  <p> Priority: ${todo.priority}</p>
                  <span onclick="deleteTodo(${todo.id})" style="cursor: pointer;"  uk-icon="icon: trash"></span>
      </div>
  </div>
    `;
}


function edit() {
  const task_title = localStorage.getItem("titles");
  console.log(task_title);
  document.getElementById("card-title").value = task_title;

  const task_description = localStorage.getItem("Description");
  console.log(task_description);
  document.getElementById("card-todotext").value = task_description;

  const task_duedate = localStorage.getItem("Due_date");
  console.log(task_duedate);
  document.getElementById("card-DueDate").value = task_duedate;

  const task_time = localStorage.getItem("time");
  console.log(task_time);
  document.getElementById("card_time").value = task_time;

  const task_priority = localStorage.getItem("priority");
  console.log(task_priority);
  document.getElementById("card-prio").value = task_priority;
}

function displaytodos(todo) {
  document.getElementById("td-card-container").innerHTML = null;

  todo
    .map((todoz) => repeatcard(todoz))
    .forEach(
      (todoz) =>
        (document.getElementById("td-card-container").innerHTML += todoz)
    );
}




function saveTask() {
  const ToDoTitle = document.getElementById("td-title").value;
  const ToDoDes = document.getElementById("td-todotext").value;
  const ToDo_Due_Date = document.getElementById("td-DueDate").value;
  const ToDo_Priority = document.getElementById("td-prio").value;

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_time, ToDo_Priority);

  postToDoToBackend(
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority
  );
}

function updateTask() {
  const ToDoid = localStorage.getItem("id");
  const ToDoTitle = document.getElementById("card-title").value;
  const ToDoDes = document.getElementById("card-todotext").value;
  const ToDo_Due_Date = document.getElementById("card-DueDate").value;
  const ToDo_time = document.getElementById("card_time").value;
  const ToDo_Priority = document.getElementById("card-prio").value;

  console.log(
    ToDoid,
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority
  );

  updateTodoToDB(
    ToDoid,
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority
  );

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);

  postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);
}

function getTodosFromBackend() {
  fetch("http://localhost:4000/todos")
    .then((res) => res.json())
    .then((json) => {
      const todos = json.map((todoz) => new ToDo(todoz));
      displaytodos(todos);
    })
    .catch((error) => console.log(error));
}

function updateTodoToDB(
  ToDoid,
  ToDoTitle,
  ToDoDes,
  ToDo_Due_Date,
  ToDo_time,
  ToDo_Priority
) {
  var fetchConfig = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ToDoid,
      title: ToDoTitle,
      description: ToDoDes,
      due_date: ToDo_Due_Date,
      time: ToDo_time,
      priority: ToDo_Priority,
    }),
  };

  fetch("http://localhost:4000/todos", fetchConfig).then((res) => {
    if (res.status === 200) {
      console.log(res.status);
      getTodosFromBackend();
      UIkit.notification({
        message: "Task updated!",
        status: "success",
        pos: "bottom-center",
        timeout: 3_000,
      });
    }
  });
}

function postToDoToBackend(
  ToDoTitle,
  ToDoDes,
  ToDo_Due_Date,
  ToDo_time,
  ToDo_Priority
) {
  var fetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: ToDoTitle,
      description: ToDoDes,
      due_date: ToDo_Due_Date,
      time: ToDo_time,
      priority: ToDo_Priority,
    }),
  };

  fetch("http://localhost:4000/todos", fetchConfig).then((res) => {
    if (res.status === 201) {
      console.log(res.status);

      UIkit.notification({
        message: "New Task created!",
        status: "success",
        pos: "bottom-center",
        timeout: 3_000,
      });

    }
  });
}


// #####################################


function deleteTodo(ToDoId) {
  // var result = confirm("Are you sure to delete?");
  console.log("DELETE")
  if (confirm("Are you sure to delete?")) {
    var fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ToDoId
      })
    }

    console.log("jz wird deleted");
    fetch("http://localhost:4000/todos", fetchConfig)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {


          UIkit.notification({
            message: "Task Delete!",
            status: "success",
            pos: "bottom-center",
            timeout: 3_000,
          });

        }
      })
      .catch((err)=>{
        console.log(err)
      });
  }
}

// #####################################


getTodosFromBackend();

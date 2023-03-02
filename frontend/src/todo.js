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
    this.status = data.status;
  } 
}

function repeatcard(todo) {
  return `
  <div class="uk-card uk-card-default" uk-width-2-2@m td-container-center" style="margin-bottom: 30px;">
    <div class="uk-card-header">
      <div class="uk-grid-small uk-flex-middle" uk-grid>            
          <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">${todo.title}                      
                    <a href="#" uk-toggle="target: #Edit-ToDo-modal" class="uk-icon-link"uk-icon="pencil"></a></h3>
                    <p hidden>${todo.id}</h2>                    
          </div>
      </div>
    </div>
      <div class="uk-card-body">
                  <p>Due_date: ${todo.due_date}</p>
                  <p>Time :${todo.time}</p>
                  <p>Description:${todo.description}</p>
                  <p> Priority: ${todo.priority}</p>
                  <p> Status: ${todo.status}</p>
      </div>
  </div>
    `;
}

function displaytodos(todo) {
  document.getElementById("td-card-container").innerHTML = null
  todo
      .map(todoz => repeatcard(todoz))
      .forEach(todoz => document.getElementById("td-card-container").innerHTML += todoz)
}


function saveTask() {
  const ToDoTitle = document.getElementById("td-title").value;  
  const ToDoDes = document.getElementById("td-todotext").value;
  const ToDo_Due_Date = document.getElementById("td-DueDate").value;
  const ToDo_time = document.getElementById("td_time").value;
  const ToDo_Priority = document.getElementById("td-prio").value;
  var ToDo_status;
      if(document.getElementById('status_pending').checked) {   
          ToDo_status = document.getElementById('status_pending').value;  }  
      else{
        if(document.getElementById('status_completed').checked) {   
            ToDo_status = document.getElementById('status_completed').value; }}

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority,ToDo_status);

  postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority, ToDo_status);
}


function getTodosFromBackend(){    
  fetch("http://localhost:4000/todos")
      .then(res => res.json())
      .then (json => {
          const todos = json.map(todoz => new ToDo(todoz))
          displaytodos(todos)})
      .catch(error => console.log(error))
                 
      }

function postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority, ToDo_status) {
  var fetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: ToDoTitle,
      description: ToDoDes,
      due_date: ToDo_Due_Date,
      time : ToDo_time,
      priority: ToDo_Priority,
      status : ToDo_status,
    }),
  }

  fetch("http://localhost:4000/todos", fetchConfig).then((res) => {
      if (res.status === 201) {
        console.log(res.status)

        UIkit.notification({
          message: "New Task created!",
          status: "success",
          pos: "bottom-center",
          timeout: 3_000,
        });
        
      }
    });
}

getTodosFromBackend();


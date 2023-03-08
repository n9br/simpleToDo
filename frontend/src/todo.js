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
    this.due_date = new Date(data.due_date);
    this.time = data.time;
    this.priority = data.priority;
    this.status = data.status;
  }
}


function repeatcard(todo) {

  let highlightclass = "";
  let today = new Date().toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"});
  let due_date = new Date(todo.due_date).toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"});
  // let due_date = new Date(todo.due_date);
  // console.log("Today: " + today + " - due date: " + due_date);
  if (due_date === today) {
    console.log("highlight: " + today + " = due date: " + due_date);
    highlightclass = "td-today";
  }

  // let displayDate = new Date(todo.due_date).toLocaleDateString('en-us', { dateStyle: "medium", timeStyle: "short", timeZone: "", weekday:"short", month:"short", day:"numeric"});
  // let displayDate = new Date(todo.due_date);
  // let displayDate = new Date(todo.due_date).toLocaleDateString('en-us');
  let displayDate = new Date(todo.due_date).toLocaleDateString('de-de', { weekday:"short", month:"numeric", day:"numeric" });

  let prioMark = todo.priority

  return `
  <div class="uk-card uk-card-default ${highlightclass} uk-width-1-2@m td-container-center" style="margin-bottom: 30px;">
    <div class="uk-card-header">
      <div class="uk-grid-small uk-flex-middle" uk-grid style="display: flex; justify-content: space-even;"> 
      
        <div class="uk-width-auto ${prioMark}">
        </div>

        <div class="uk-width-auto" >
            <p class="uk-card-title uk-margin-remove-bottom td-date">${displayDate}</p>
        </div>

          <div class="uk-width-expand">
                    <h4 class="uk-card-title uk-margin-remove-bottom">${
                      todo.title
                    }                      
                    <a href="#" onclick=
                    "localStorage.setItem('id','${todo.id}'),
                    localStorage.setItem('titles','${todo.title}'),
                    localStorage.setItem('Description','${todo.description}'), 
                    localStorage.setItem('Due_date','${todo.due_date}'),
                    localStorage.setItem('time','${todo.time}'),
                    localStorage.setItem('priority','${todo.priority}'),
                    localStorage.setItem('status', '${todo.status}'),
                    edit()"
                    uk-toggle="target: #Edit-ToDo-modal" class="uk-icon-link"uk-icon="pencil"></a></h4>
                    <p hidden>${todo.id}</p>                    
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
                  <p> Status: ${todo.status}</p>
                  <a href="#" onclick= "localStorage.setItem('id','${todo.id}')"
                    uk-toggle="target: #create-delete-modal"  class="uk-active" uk-icon="icon: trash"></a>
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
  let isodate = new Date(task_duedate).toISOString().split('T')[0];
  let d = new Date(task_duedate);
  console.log("task_duedate: " + task_duedate + " - isodate: " + isodate );
  let datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
  document.getElementById("card-DueDate").value = datestring;

  const task_time = localStorage.getItem("time");
  console.log(task_time);
  document.getElementById("card_time").value = task_time;

  const task_priority = localStorage.getItem("priority");
  console.log(task_priority);
  document.getElementById("card-prio").value = task_priority;


  const task_status = localStorage.getItem("status");
  console.log(task_status);
      if(task_status == "Pending"){
      document.getElementById("card_status_pending").checked =true;
      }
      else if(task_status == "Completed"){
      document.getElementById("card_status_completed").checked =true;
      }
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
      if (ToDoTitle == ""){
        alert("Please fill title");
        document.getElementById("td-title").focus();
        return false;
      } 

  const ToDoDes = document.getElementById("td-todotext").value
      if(ToDoDes== ""){
        alert("Please fill Description");
        document.getElementById("td-todotext").focus();
        return false;
      }
      
  const ToDo_Due_Date = document.getElementById("td-DueDate").value;
      if(ToDo_Due_Date == ""){
        alert("Please fill DueDate");
        document.getElementById("td-DueDate").focus();
        return false;
      }

  const ToDo_Priority = document.getElementById("td-prio").value
      if(ToDo_Priority== ""){
        alert("Please fill Priority");
        document.getElementById("td-prio").focus();
        return false;
      }
      
  
  const ToDo_time = document.getElementById("td_time").value;
      if (ToDo_time ==""){
        alert("Please fill Time");
        document.getElementById("td_time").focus();
        return false;
      }
  var ToDo_status;
      if(document.getElementById('status_pending').checked) {   
          ToDo_status = document.getElementById('status_pending').value;  }  
      else{
        if(document.getElementById('status_completed').checked) {   
            ToDo_status = document.getElementById('status_completed').value; }}

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_time, ToDo_Priority,ToDo_status);
 
  postToDoToBackend(
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority,
    ToDo_status
  );
}

function reset(){
  document.getElementById("td-title").value = "";
  document.getElementById("td-todotext").value = "";
  document.getElementById("td-DueDate").value = "";
  document.getElementById("td_time").value = "";
  document.getElementById("td-prio").value = "low"
 }


function updateTask() {
  const ToDoid = localStorage.getItem("id");
  const ToDoTitle = document.getElementById("card-title").value;
  const ToDoDes = document.getElementById("card-todotext").value;
  const ToDo_Due_Date = document.getElementById("card-DueDate").value;
  const ToDo_time = document.getElementById("card_time").value;
  const ToDo_Priority = document.getElementById("card-prio").value;
  var ToDo_status;
      if(document.getElementById('card_status_pending').checked) {   
          ToDo_status = document.getElementById('card_status_pending').value;  }  
      else{
        if(document.getElementById('card_status_completed').checked) {   
            ToDo_status = document.getElementById('card_status_completed').value; 
          }
        }
  console.log(
    ToDoid,
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority,
    ToDo_status,
    
  );

  updateTodoToDB(
    ToDoid,
    ToDoTitle,
    ToDoDes,
    ToDo_Due_Date,
    ToDo_time,
    ToDo_Priority,
    ToDo_status,
  );

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority,ToDo_status);
}

function toggleSort() {
  if ( ! localStorage.getItem("sortOrder")) {
    localStorage.setItem('sortOrder','date-asc');
    getTodosFromBackend();
  }
}

function getTodosFromBackend(){    
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
  ToDo_Priority,
  ToDo_status
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
      status: ToDo_status,
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

function postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_time, ToDo_Priority, ToDo_status) {
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
      status : ToDo_status,
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
      reset();
      getTodosFromBackend();
    }
  });
}




function deleteTodo() {
  ToDoId = localStorage.getItem('id');
  // var result = confirm("Are you sure to delete?");
  console.log("DELETE id: "+ ToDoId)


  // if (confirm("Are you sure to delete?")) {
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
// }
getTodosFromBackend();

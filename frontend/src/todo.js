class ToDo {
  id;
  title;
  description;
  due_date = new Date();
  time;
  priority;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.due_date = new Date(data.due_date).toLocaleDateString();
    this.time = data.time;    
    this.priority = data.priority;
  }
}
function repeatcard(todo) {  
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const day = new Date(todo.due_date);
  week= weekday[day.getDay()];
  console.log(week)
  console.log(todo.id)  

  return `
      <div class="uk-card uk-card-primary" uk-width-2-2@m td-container-center" style="margin-bottom: 10px; justify-content: center">
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>            
                <div class="uk-width-expand">            
                    <p>${todo.time } ${week}: ${todo.title}                    
                    <a href="#" onclick=
                    "localStorage.setItem('titles','${todo.title}'),
                    localStorage.setItem('Description','${todo.description}'), 
                    localStorage.setItem('Due_date','${todo.due_date}'),
                    localStorage.setItem('time','${todo.time}'),
                    localStorage.setItem('priority','${todo.priority}'),
                    edit()"
                    uk-toggle="target: #edit-ToDo-modal" class="uk-icon-link" uk-icon="pencil"></a> <br>
                    ${todo.due_date}</p>                      
                </div>
            </div>
        </div>        
    </div>  
    `;
  }

  //To display Data for editing the task

function edit(){
  const task_title = localStorage.getItem('titles')
  console.log(task_title)
  document.getElementById("card-title").value=task_title;

  const task_description = localStorage.getItem('Description')
  console.log(task_description)
  document.getElementById("card-text").value=task_description;


  const task_duedate = localStorage.getItem('Due_date')
  console.log(task_duedate)
  document.getElementById("card-DueDate").value=task_duedate;


  // document
  //   .getElementById('card-DueDate')
  //   .addEventListener('click', function () {
  //       value.setVal(new Date('Due_date'));
  //   }, false);



  const task_time = localStorage.getItem('time')
  console.log(task_time)
  document.getElementById("card_time").value = task_time;


  const task_priority = localStorage.getItem('priority')
  console.log(task_priority)
  document.getElementById("card-prio").value = task_priority;
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
  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority);
  postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority);
}

function getTodosFromBackend(){    
  fetch("http://localhost:4000/todos")
      .then(res => res.json())
      .then (json => {
          const todos = json.map(todoz => new ToDo(todoz))
          displaytodos(todos)})          
      .catch(error => console.log(error))
                 
      }

      function editTodosFromBackend(){    
        fetch("http://localhost:4000/todos")
            .then(res => res.json())
            .then (json => {
                const todos = json.map(todoz => new ToDo(todoz))
                editToDo(todos)})  
              console.log(json.todos.id)
            .catch(error => console.log(error))
                       
            }

function postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date,ToDo_time, ToDo_Priority) {
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

  
  
// function setValues(){
//     document.getElementById("td-title").setAttribute("value",ToDo.title);
// };


  getTodosFromBackend()
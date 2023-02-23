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
}


function repeatcard(todo) {

  // let longDate = new Date(todo.due_date).toLocaleDateString('en-us', { dateStyle: "medium", timeStyle: "short", timeZone: "", weekday:"short", month:"short", day:"numeric"});
  // let longDate = new Date(todo.due_date);
  // let longDate = new Date(todo.due_date).toLocaleDateString('en-us');
  let longDate = new Date(todo.due_date).toLocaleDateString('de-de', { weekday:"short" });

  return `
    <div class="uk-card uk-card-default uk-width-1-2@m td-container-center" style="margin-bottom: 30px;">
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid style="display: flex; justify-content: space-between;">
                
                <div class="uk-width-expand" >
                    <h4 class="uk-card-title uk-margin-remove-bottom">${todo.title}</h4>
                </div>

                <div class="uk-width-expand" >
                <p class="uk-card-title uk-margin-remove-bottom td-date">${longDate}</p>
                </div>

            </div>
        </div>
        <div class="uk-card-body">
        <p class="uk-text-meta uk-margin-remove-top"><time>Due_date: ${todo.due_date}</time></p>
            <p>Description:${todo.description}</p>
            <p> Priority: ${todo.priority}</p>
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
  const ToDo_Priority = document.getElementById("td-prio").value;

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);

  postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);
}

function getTodosFromBackend(){    
  fetch("http://localhost:4000/todos")
      .then(res => res.json())
      .then (json => {
          const todos = json.map(todoz => new ToDo(todoz))
          displaytodos(todos)})
      .catch(error => console.log(error))
                 
      }

function postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority) {
  var fetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: ToDoTitle,
      description: ToDoDes,
      due_date: ToDo_Due_Date,
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

  getTodosFromBackend()
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

function saveTask() {
  const ToDoTitle = document.getElementById("td-title").value;
  const ToDoDes = document.getElementById("td-todotext").value;
  const ToDo_Due_Date = document.getElementById("td-DueDate").value;
  const ToDo_Priority = document.getElementById("td-prio").value;

  console.log(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);

  postToDoToBackend(ToDoTitle, ToDoDes, ToDo_Due_Date, ToDo_Priority);
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
  };

  fetch("http://localhost:4000/todos", fetchConfig).then((res) => {
    if (res.status === 201) {
      // @ts-ignore
      UIkit.notification({
        message: "Task created!",
        status: "success",
        pos: "bottom-center",
        timeout: 3_000,
      });
    }
  });
}
// console.log(res)
// }

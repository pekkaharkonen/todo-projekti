const taskData = document.getElementById("task");
const button = document.getElementById("button");

button.addEventListener("click", postTask);
window.addEventListener("DOMContentLoaded", getTasks);

function postTask(e) {
  if (taskData.value === ""){
    alert("Please add a task")
    return;
  }
  //Lähetetään form data Fetch POSTilla:
  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task: taskData.value
    })
  })
    .then(res => {
      if (res.status === 201) {
        console.log("Post request successful!");
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));

  // Varmuuden vuoksi estetään tavallisesti tapahtuva:
  e.preventDefault();
}

async function getTasks() {
  try {
    const response = await fetch("/api/tasks");
    const fetchedTasks = await response.json();
    console.log(fetchedTasks);
    addTasksToSite(fetchedTasks);
  } catch (error) {
    console.log(error)
  }
}

function addTasksToSite(tasks) {}



const taskData = document.getElementById("task");
const button = document.getElementById("button");
const taskList = document.getElementById("task-list");
const filter = document.getElementById("filter")

// Tallennetaan taskit myös tähän arrayhin filtteröinnin helpottamiseksi
let currentTasks = [];

button.addEventListener("click", postTask);
window.addEventListener("DOMContentLoaded", getTasks);
taskList.addEventListener("click", updateOrDeleteTask);
filter.addEventListener("keyup", filterTasks)

function postTask(e) {
  if (taskData.value === "") {
    alert("Please add a task");
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

  location.reload();
  // Varmuuden vuoksi estetään tavallisesti tapahtuva:
  e.preventDefault();
}

async function getTasks() {
  try {
    const response = await fetch("/api/tasks");
    const fetchedTasks = await response.json();
    //Tallennetaan taskit myös arrayhyn:
    currentTasks = fetchedTasks;
    addTasksToSite(fetchedTasks);
  } catch (error) {
    console.log(error);
  }
}

function updateOrDeleteTask(e) {
  // Haetaan taskin arvot event-parametrilta
  let taskName = e.target.parentElement.parentElement.firstChild.innerText;
  let taskId = e.target.parentElement.parentElement.firstChild.id;

  // Kutsutaan funktiota updateTask tai deleteTask riippuen siitä, kumpaa nappia ollaan painettu

  if (e.target.innerHTML === "Update") {
    updateTask(taskName, taskId);
  }
  if (e.target.innerHTML === "Delete") {
    deleteTask(taskId);
  }
}

function addTasksToSite(tasks) {
  for (let t of tasks) {
    let li = document.createElement("li");
    li.innerHTML = `<p id="${t.id}">${t.task}</p> <span><button id="update-task">Update</button><button id="delete-task">Delete</button></span>`;
    taskList.appendChild(li);
  }
}

function deleteTask(id) {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (res.status === 200) {
        console.log("Delete request successful!");
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));

  location.reload();
}


function updateTask(task, id) {
  const editTask = document.getElementById('edit-task');
  const addTask = document.getElementById('add-task')
  editTask.style.display = "block"
  addTask.style.display = "none"

  // Jos cancelia painettu, muutetaan displayt takaisin alkuperäisiksi
  document.getElementById('button-cancel').addEventListener("click", (e)=> {
    editTask.style.display = "none";
    addTask.style.display = "block"
  })

  document.getElementById('button-edit').addEventListener("click", (e)=> {
    console.log("kutsutaan")
  })
}


async function filterTasks(e) {
  console.log(e.target.value);
  let searchParam = e.target.value.trim().toLowerCase();
  for (let t of currentTasks) {
    if (t.task.toLowerCase().startsWith(searchParam)) {
      document.getElementById(t.id).parentElement.style.display = "flex";
    } else {
      document.getElementById(t.id).parentElement.style.display = "none";
    }
  }
}

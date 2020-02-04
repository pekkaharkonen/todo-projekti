const taskData = document.getElementById("task");
const button = document.getElementById("button");

button.addEventListener("click", sendData);

function sendData(e) {
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
      if (res.status === 201){
        console.log("Post request successful!")
      }
      return res.json();
    })
    .then(data => console.log(data));

  // Varmuuden vuoksi estetään tavallisesti tapahtuva:
  e.preventDefault();
}

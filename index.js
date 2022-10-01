import { saveTask, getTasks, onGetTasks } from './firebase.js'

const tasksContainer = document.getElementById('tasks-container')
const taskForm = document.getElementById("task-form")

window.addEventListener('DOMContentLoaded', async () => {
  console.log("works")
  /* Se llama una vez */
  //const querySnapshot = await getTasks()
 onGetTasks((querySnapshot) => {
    let html = ``
    querySnapshot.forEach((doc) => {
      const task = doc.data()
      html += `
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>
      `
    })
    tasksContainer.innerHTML = html
  })
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']
  if(title.value !== "" && description.value !== ""){
    saveTask(title.value, description.value)
    taskForm.reset()
  }
  else {
    alert("Insert a title and a description")
  }
})
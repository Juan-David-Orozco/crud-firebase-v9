import { saveTask } from './firebase.js'

window.addEventListener('DOMContentLoaded', () => {
  console.log("works")
})

const taskForm = document.getElementById("task-form")

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']
  if(title.value !== "" && description.value !== ""){
    saveTask(title.value, description.value)
    title.value = ""
    description.value = ""
  }
  else {
    alert("Insert a title and a description")
  }
})
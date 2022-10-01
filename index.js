import { saveTask, getTasks, onGetTasks, deleteTask, getTask } from './firebase.js'

const tasksContainer = document.getElementById('tasks-container')
const taskForm = document.getElementById("task-form")

let editStatus = false

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
          <button class='btn-delete' data-id="${doc.id}">Delete</button>
          <button class='btn-edit' data-id="${doc.id}">Edit</button>
        </div>
      `
    })
    tasksContainer.innerHTML = html

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({target: { dataset }}) => {
        deleteTask(dataset.id)
      })
    })

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({target: { dataset }}) => {
        const doc = await getTask(dataset.id)
        if(!doc) throw new Error("Task not found")
        const task = doc.data()
        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        editStatus = true
      })
    })

  })
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if(editStatus) {
    console.log("editing")
    editStatus = false
  } else {
    //if(title.value !== "" && description.value !== ""){
      saveTask(title.value, description.value)
  }

  taskForm.reset()  
})
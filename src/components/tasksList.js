export const createTasksList = (tasks = []) => {
  const tasksList = document.createElement('ul')
  tasksList.id = "tasks-list"

  tasks.forEach((task) => {
    const listItem = document.createElement('li')
    listItem.innerText = task.title
    listItem.id = `task-${task.id}`

    tasksList.appendChild(listItem)
  })

  return tasksList
}

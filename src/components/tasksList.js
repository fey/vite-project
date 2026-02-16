export const createTasksList = (tasks = []) => {
  const tasksList = document.createElement('ul')

  tasks.forEach((task) => {
    const listItem = document.createElement('li')
    listItem.innerText = task.title

    tasksList.appendChild(listItem)
  })

  return tasksList
}

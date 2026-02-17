const ui = {
  form: null,
  tasksList: null,
  historyList: null,
  progress: null,
}
const state = {
  formState: {
    value: '',
    isValid: undefined,
    error: null,
  },
  taskNextId: 1,
  tasks: [],
  history: [],
}

const findTask = (tasks, id) => {
  return tasks.find(task => task.id === id)
}

/** @param {SubmitEvent} e */
const handleSubmit = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const title = formData.get('title')

  if (title === '') {
    state.formState.isValid = false
    state.formState.error = 'Title should be filled'
  }
  else {
    state.formState.isValid = true
    state.formState.error = null
    addTask({ title })
  }

  render()
}

const addTask = (taskData) => {
  state.tasks.push({ ...taskData, id: state.taskNextId })
  state.taskNextId++
  state.formState.value = ''
  state.formState.isValid = true
  state.formState.error = null

  state.history.push('task added')
}

const markTaskCompleted = (id) => {
  const { tasks, history } = state

  const task = findTask(tasks, id)

  if (!task) {
    return
  }

  task.isCompleted = true
  history.push('task completed')
}

/** @param {InputEvent} e */
const handleInput = (e) => {
  state.formState.value = e.target.value
  state.formState.isValid = undefined
  state.formState.error = null
  render()
}

/** @param {PointerEvent} e */
const handleClick = (e) => {
  e.preventDefault()

  const taskElement = e.target.closest([`[data-type="task"]`])
  const id = Number(taskElement.dataset.id)

  const { tasks } = state
  const task = findTask(tasks, id)

  if (task.isCompleted) {
    return
  }

  if (!confirm('Mark task as finished?')) {
    return
  }

  markTaskCompleted(id)
  render()
}

const renderTasks = () => {
  ui.tasksList.innerHTML = ''

  if (state.tasks.length === 0) {
    ui.tasksList.innerHTML = '<p>Tasks list is empty</p>'
  }

  const { tasks } = state

  tasks.forEach((task) => {
    const listItemElement = document.createElement('li')
    listItemElement.style.listStyleType = 'none'
    listItemElement.dataset.id = task.id
    listItemElement.dataset.type = 'task'
    listItemElement.id = `task-${task.id}`

    if (task.isCompleted) {
      listItemElement.innerText = `✅ #${task.id} - ${task.title}`
      listItemElement.style.textDecoration = 'line-through'
      ui.tasksList.append(listItemElement)
    }
    else {
      listItemElement.innerText = `⬜ #${task.id} - ${task.title}`
      ui.tasksList.prepend(listItemElement)
    }
  })
}

const renderHistory = () => {
  const { historyList } = ui

  historyList.innerHTML = ''

  if (state.history.length === 0) {
    historyList.innerHTML = '<p>History is empty</p>'
    return
  }

  const listElements = state.history.map((item) => {
    const element = document.createElement('li')

    element.innerHTML = `<span>${item}</span>`

    return element
  })

  historyList.append(...listElements)
}

const renderForm = () => {
  /** @type {HTMLFormElement} form */
  const form = ui.form
  const { formState } = state

  /** @type {HTMLInputElement} titleElement */
  const titleElement = form.elements.title

  titleElement.value = formState.value

  const helperTextElement = form.querySelector('small') || document.createElement('small')

  helperTextElement.remove()

  if (formState.isValid === undefined) {
    titleElement.ariaInvalid = null

    return
  }

  if (formState.isValid === false) {
    titleElement.ariaInvalid = true
    helperTextElement.innerText = formState.error
  }
  else if (formState.isValid === true) {
    titleElement.ariaInvalid = false
    helperTextElement.innerText = 'Success'
  }

  titleElement.parentElement.after(helperTextElement)
}

const renderProgress = () => {
  const { tasks } = state

  /** @type {HTMLProgressElement} progress */
  const progress = ui.progress

  progress.max = tasks.length
  progress.value = tasks.filter(({ isCompleted }) => isCompleted).length
}

const render = () => {
  renderForm()
  renderTasks()
  renderHistory()
  renderProgress()
}

const initApp = () => {
  ui.form = document.getElementById('create_task_form')
  ui.tasksList = document.getElementById('tasks_list')
  ui.historyList = document.getElementById('tasks_history_list')
  ui.progress = document.getElementById('tasks_progress')

  ui.form.elements.title.addEventListener('input', handleInput)
  ui.form.addEventListener('submit', handleSubmit)

  ui.tasksList.addEventListener('click', handleClick)

  render()
}

export default initApp

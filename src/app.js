import { createTaskForm } from './components/form'
import { createTasksList } from './components/tasksList'

const state = {
  taskId: 1,
  form: {
    value: '',
    valid: undefined,
  },
  tasks: [],
}

/** @param {SubmitEvent} e */
const handleSubmit = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const title = formData.get('title')

  state.taskId++
  state.tasks.push({ title, id: state.taskId })

  render()
}

/** @param {ChangeEvent} e */
const handleInput = (e) => {
  state.createForm.value = e.target.value
}

const render = () => {
  const root = document.getElementById('app')
  root.innerHTML = ''

  /** @type HTMLFormElement */
  const form = createTaskForm(state.form)

  /** @type {HTMLInputElement} */
  const titleInput = form.elements.title
  titleInput.addEventListener('input', handleInput)

  form.addEventListener('submit', handleSubmit)
  root.appendChild(form)

  const tasksList = createTasksList(state.tasks)
  root.appendChild(tasksList)
}

const initApp = () => {
  render()
}

export default initApp

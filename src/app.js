import { createTaskForm } from './components/form'
import { createTasksList } from './components/tasksList'

const tasks = []

/**
 *
 * @param {SubmitEvent} e
 */
const handleSubmit = (e) => {
  e.preventDefault()

  /**
   * @type {HTMLFormElement}
   */
  const form = e.target
  form.elements['submit'].disabled = true

  const formData = new FormData(form)
  const title = formData.get('title')

  tasks.push({ title })

  console.table(tasks)
  form.elements['submit'].disabled = false
}

const initApp = () => {
  const root = document.getElementById('app')

  /** @type HTMLFormElement */
  const form = createTaskForm()

  root.appendChild(form)

  form.addEventListener('submit', handleSubmit)

  const tasksList = createTasksList([
    { title: 'jopa' },
    { title: 'lala' },
    { title: 'kek' },
  ])

  root.appendChild(tasksList)
}

export default initApp

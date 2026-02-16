/**
 * @constructor
 */
export const createTaskForm = () => {
  const form = document.createElement('form')
  form.id = 'create-task-form'

  const label = document.createElement('label')
  label.innerText = 'Add task'
  label.setAttribute('for', 'task-title')

  const input = document.createElement('input')
  input.type = 'text'
  input.name = 'title'
  input.placeholder = 'buy a milk...'
  input.id = 'task-title'

  const submit = document.createElement('button')
  submit.name = 'submit'
  submit.type = 'submit'
  submit.innerText = 'Submit'

  form.append(label, input, submit)

  return form
}

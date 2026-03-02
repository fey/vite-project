// @ts-check

/**
 * @type {{}[]}
 */
const tasks = []
let taskNextId = 1

const findTask = (id) => {
  return tasks.find(task => task.id === id)
}

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async (fastify, _opts) => {
  fastify.get('/', async () => {
    return tasks
  })

  fastify.post('/', async (request, reply) => {
    const { title } = request.body

    const task = {
      id: taskNextId,
      title,
      isCompleted: false,
    }

    tasks.push(task)
    taskNextId++

    console.log(task)

    reply.status(201)
    reply.send(task)
  })

  fastify.patch('/:id/complete', async (request, reply) => {
    const { id } = request.params

    const task = findTask(Number(id))

    if (!task) {
      return reply.notFound()
    }

    reply.status(204)
  })
}

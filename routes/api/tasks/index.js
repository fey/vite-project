const tasks = []
let taskNextId = 1

const findTask = (id) => {
  return tasks.find(task => task.id === id)
}

/** @param {import("fastify").FastifyInstance} fastify  */
export default async (fastify, opts) => {
  /**
   * @param {import("fastify/types/request").RequestGenericInterface} request
   * @param {import("fastify/types/reply").ReplyGenericInterface} reply
   */
  fastify.get('/', async (request, reply) => {
    return tasks
  })

  /**
   * @param {import("fastify/types/request").RequestGenericInterface} request
   * @param {import("fastify/types/reply").ReplyGenericInterface} reply
   */
  fastify.post('/', async (request, reply) => {
    const { title } = request.body

    const task = {
      id: taskNextId,
      title,
      isCompleted: false,
    }

    tasks.push(task)
    taskNextId++

    reply.status(201)
    reply.send(task)
  })

  /**
   * @param {import("fastify/types/request").RequestGenericInterface} request
   * @param {import("fastify/types/reply").ReplyGenericInterface} reply
   */
  fastify.patch('/:id/complete', async (request, reply) => {
    const { id } = request.params

    const task = findTask(Number(id))

    if (!task) {
      return reply.notFound()
    }

    reply.status(204)
  })
}

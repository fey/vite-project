export default async function (fastify, _opts) {
  fastify.get('/health', async function (_request, _reply) {
    return { status: 'ok' }
  })
}

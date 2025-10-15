import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createRoomsRoute } from './http/routes/create-room.ts'
import { getRoomsQuestionsRoute } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/health', () => {
  return { message: 'OK!' }
})

app.register(getRoomsRoute)
app.register(createRoomsRoute)
app.register(getRoomsQuestionsRoute)

app.listen({ port: env.PORT })

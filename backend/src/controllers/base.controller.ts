import { FastifyRequest, FastifyReply } from 'fastify'
import { AppError, ValidationError, NotFoundError, HTTP_STATUS } from '../common'

export abstract class BaseController {
  protected async handleRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    operation: () => Promise<any>
  ) {
    try {
      const result = await operation()
      return reply.status(HTTP_STATUS.OK).send(result)
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  protected async handleCreateRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    operation: () => Promise<any>
  ) {
    try {
      const result = await operation()
      return reply.status(HTTP_STATUS.CREATED).send(result)
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  protected async handleDeleteRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    operation: () => Promise<any>
  ) {
    try {
      await operation()
      return reply.status(HTTP_STATUS.NO_CONTENT).send()
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  private handleError(error: any, reply: FastifyReply) {
    console.error('Controller Error:', error)

    if (error instanceof ValidationError) {
      return reply.status(HTTP_STATUS.BAD_REQUEST).send({ 
        error: error.message,
        type: 'validation_error'
      })
    }

    if (error instanceof NotFoundError) {
      return reply.status(HTTP_STATUS.NOT_FOUND).send({ 
        error: error.message,
        type: 'not_found_error'
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ 
        error: error.message,
        type: 'app_error'
      })
    }

    return reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ 
      error: 'Erro interno do servidor',
      type: 'internal_server_error'
    })
  }
}

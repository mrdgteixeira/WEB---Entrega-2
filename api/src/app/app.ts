import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { bankRoutes } from '../routes/banks/route';
import { categoryRoutes } from '../routes/categories/route';
import { transactionRoutes } from '../routes/transactions/route';

async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      } : undefined
    }
  });

  // Register CORS
  await app.register(fastifyCors, {
    origin: process.env.NODE_ENV === 'production' 
      ? ['http://localhost:3000', 'http://localhost:3001'] 
      : '*',
    credentials: true
  });

  // Health check
  app.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  });

  // API routes
  app.register(bankRoutes, { prefix: '/api/banks' });
  app.register(categoryRoutes, { prefix: '/api/categories' });
  app.register(transactionRoutes, { prefix: '/api/transactions' });

  // Global error handler
  app.setErrorHandler(async (error, request, reply) => {
    app.log.error(error);
    
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Erro interno do servidor';
    
    return reply.status(statusCode).send({
      error: message,
      statusCode,
      timestamp: new Date().toISOString()
    });
  });

  return app;
}

export default buildApp;

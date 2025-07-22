import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { bankRoutes } from '../api/banks/route';
import { categoryRoutes } from '../api/categories/route';
import { transactionRoutes } from '../api/transactions/route';

async function buildApp() {
  const app = Fastify();

  await app.register(fastifyCors, {
    origin: '*', // ou defina seu frontend
  });

  app.register(bankRoutes, { prefix: '/banks' });
  app.register(categoryRoutes, { prefix: '/categories' });
  app.register(transactionRoutes, { prefix: '/transactions' });

  return app;
}

export default buildApp;

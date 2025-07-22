import 'dotenv/config';
import buildApp from './app';
import { DatabaseConnection } from '../common';
import { FastifyInstance } from 'fastify';

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  let app: FastifyInstance | undefined;
  
  try {
    app = await buildApp();

    const gracefulShutdown = async (signal: string) => {
      if (app) {
        app.log.info(`Received ${signal}, shutting down gracefully...`);
        
        try {
          await app.close();
          await DatabaseConnection.disconnect();
          app.log.info('Server closed successfully');
          process.exit(0);
        } catch (error) {
          app.log.error('Error during shutdown:', error);
          process.exit(1);
        }
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    await app.listen({ 
      port: Number(PORT), 
      host: HOST 
    });

    app.log.info(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
    app.log.info(`📊 Health check: http://${HOST}:${PORT}/health`);
    app.log.info(`🏦 Banks API: http://${HOST}:${PORT}/api/banks`);
    app.log.info(`📁 Categories API: http://${HOST}:${PORT}/api/categories`);
    app.log.info(`💰 Transactions API: http://${HOST}:${PORT}/api/transactions`);

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    if (app) {
      await app.close();
    }
    await DatabaseConnection.disconnect();
    process.exit(1);
  }
}

startServer();

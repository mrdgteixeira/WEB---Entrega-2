import Fastify from 'fastify';
import buildApp from './app'; 

const PORT = process.env.PORT || 3333;

async function startServer() {
  const app = await buildApp();

  app.listen({ port: Number(PORT) }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(` Servidor rodando em ${address}`);
  });
}

startServer();

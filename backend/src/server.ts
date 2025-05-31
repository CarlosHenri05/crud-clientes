import { fastify } from 'fastify';
import { clientRoutes } from './routes/client.routes';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import { AppError } from './utils/errors';
import { assetRoutes } from './routes/asset.routes';

const server = fastify({
  logger: true,
});

server.register(swagger, {
  swagger: {
    info: {
      title: 'Client API',
      description: 'Documentação da API de Clientes',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
});

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
});

server.register(clientRoutes);
server.register(assetRoutes);

server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({ message: error.message });
  } else if (error instanceof Error) {
    server.log.error(error);
    reply.status(500).send({ message: 'Internal Server Error' });
  } else {
    reply.status(500).send({ message: 'An unexpected error occurred' });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando na porta 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

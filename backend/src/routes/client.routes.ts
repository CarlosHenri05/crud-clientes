// routes/clientRoutes.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ClientController } from '../controller/client.controller';

const clientController = new ClientController();

export async function clientRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /clients
  fastify.get('/clients', clientController.getAllClients);

  // GET /clients/:id
  fastify.get(
    '/clients/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', pattern: '^[0-9]+$' },
          },
        },
      },
    },
    clientController.getClientById
  );

  // POST /clients
  fastify.post(
    '/clients',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email'], // ajuste conforme seus campos obrigatórios
          properties: {
            id: { type: 'number', pattern: '^[0-9]+$' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            status: { type: 'boolean' },
            assets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', pattern: '^[0-9]+$' },
                  name: { type: 'string' },
                  value: { type: 'number' },
                  clientId: { type: 'number', pattern: '^[0-9]+$' },
                },
              },
            },
            // adicione outros campos do Client aqui
          },
        },
      },
    },
    clientController.saveClient
  );

  // PATCH /clients/:id
  fastify.patch(
    '/clients/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', pattern: '^[0-9]+$' },
          },
        },
      },
    },
    clientController.updateClientWithPatch
  );

  // PUT /clients/:id
  fastify.put(
    '/clients/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', pattern: '^[0-9]+$' },
          },
        },
      },
    },
    clientController.updateClientWithPut
  );

  // DELETE /clients/:id
  fastify.delete(
    '/clients/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', pattern: '^[0-9]+$' },
          },
        },
      },
    },
    clientController.deleteClient
  );
}

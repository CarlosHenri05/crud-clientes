// src/routes/client.routes.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ClientController } from '../controller/client.controller';
import { CreateClientSchema, UpdateClientSchema, PutClientSchema, IdParamSchema } from '../schema/client.schema';

const jsonSchema = require('zod-to-json-schema').default;

const clientController = new ClientController();

const createClientBodySchema = jsonSchema(CreateClientSchema, { $refStrategy: 'none' });
const updateClientPatchBodySchema = jsonSchema(UpdateClientSchema, { $refStrategy: 'none' });
const updateClientPutBodySchema = jsonSchema(PutClientSchema, { $refStrategy: 'none' });
const idParamJsonSchema = jsonSchema(IdParamSchema, { $refStrategy: 'none' });

export async function clientRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /clients
  fastify.get('/clients', clientController.getAllClients);

  // GET /clients/:id
  fastify.get(
    '/clients/:id',
    {
      schema: {
        params: idParamJsonSchema,
      },
    },
    clientController.getClientById
  );

  // POST /clients
  fastify.post(
    '/clients',
    {
      schema: {
        body: createClientBodySchema,
      },
    },
    clientController.saveClient
  );

  // PATCH /clients/:id
  fastify.patch(
    '/clients/:id',
    {
      schema: {
        params: idParamJsonSchema,
        body: updateClientPatchBodySchema,
      },
    },
    clientController.updateClientWithPatch
  );

  // PUT /clients/:id
  fastify.put(
    '/clients/:id',
    {
      schema: {
        params: idParamJsonSchema,
        body: updateClientPutBodySchema,
      },
    },
    clientController.updateClientWithPut
  );

  // DELETE /clients/:id
  fastify.delete(
    '/clients/:id',
    {
      schema: {
        params: idParamJsonSchema,
      },
    },
    clientController.deleteClient
  );
}

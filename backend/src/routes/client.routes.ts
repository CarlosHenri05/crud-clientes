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
  fastify.get(
    '/clients',
    {
      schema: {
        summary: 'Get all clients',
        description: 'Retrieves all clients from the database',
        tags: ['Clients'],
      },
    },
    clientController.getAllClients
  );

  // GET /clients/:id
  fastify.get(
    '/clients/:id',
    {
      schema: {
        summary: 'Get client by ID',
        description: 'Retrieves a client based on the provided ID',
        tags: ['Clients'],
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
        summary: 'Creates a new client',
        description: 'Saves a new client to the database',
        tags: ['Clients'],
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
        summary: 'Update client with PATCH',
        description: 'Updates an existing client using PATCH method',
        tags: ['Clients'],
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
        summary: 'Update client with PUT',
        description: 'Updates an existing client using PUT method',
        tags: ['Clients'],
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
        summary: 'Delete client by ID',
        description: 'Deletes a client based on the provided ID',
        tags: ['Clients'],
        params: idParamJsonSchema,
      },
    },
    clientController.deleteClient
  );
}

import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientService } from '../service/client.service';
import { NotFoundError, ConflictError } from '../utils/errors';
import { CreateClientSchema, UpdateClientSchema, PutClientSchema, IdParamSchema } from '../schema/client.schema';
import { z } from 'zod';

const clientService = new ClientService();

export class ClientController {
  async saveClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const clientData = CreateClientSchema.parse(req.body);
      const client = await clientService.saveClient(clientData);

      res.status(201).send(client);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation failed', errors: error.errors });
      }
      if (error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in saveClient:', error);
      res.status(500).send({ message: 'Failed to save client' });
    }
  }

  async getClientById(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const client = await clientService.getClientById(id);

      return res.status(200).send(client);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation failed', errors: error.errors });
      }
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in getClientById:', error);
      return res.status(500).send({ message: 'Failed to retrieve client' });
    }
  }

  async getAllClients(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clients = await clientService.getAllClients();
      return res.status(200).send(clients);
    } catch (error: any) {
      console.error('Error in getAllClients:', error);
      return res.status(500).send({ message: 'Failed to retrieve clients' });
    }
  }

  async updateClientWithPatch(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const clientData = UpdateClientSchema.parse(req.body);

      const updatedClient = await clientService.updateClientWithPatch(id, clientData);

      return res.status(200).send(updatedClient);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation failed', errors: error.errors });
      }
      if (error instanceof NotFoundError || error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in updateClientWithPatch:', error);
      return res.status(500).send({ message: 'Failed to update client' });
    }
  }

  async updateClientWithPut(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const clientData = PutClientSchema.parse(req.body);

      const updatedClient = await clientService.updateClientWithPut(id, clientData);

      return res.status(200).send(updatedClient);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation failed', errors: error.errors });
      }
      if (error instanceof NotFoundError || error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in updateClientWithPut:', error);
      return res.status(500).send({ message: 'Failed to update client' });
    }
  }

  async deleteClient(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      await clientService.deleteClient(id);
      return res.status(204).send();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation failed', errors: error.errors });
      }
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in deleteClient:', error);
      return res.status(500).send({ message: 'Failed to delete client' });
    }
  }
}

import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientService } from '../service/client.service';
import { Client } from '@prisma/client';

const clientService = new ClientService();

export class ClientController {
  async saveClient(req: FastifyRequest<{ Body: Client }>, res: FastifyReply) {
    try {
      const clientData: Client = req.body;
      const client = await clientService.saveClient(clientData);

      res.status(201).send(client);
    } catch (error) {
      console.error('Error in saveClient:', error);
      res.status(500).send({ error: 'Failed to save client' });
    }
  }
  async getClientById(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clientId = req.params.id;
      const client = await clientService.getClientById(clientId);

      if (!client) {
        return res.status(404).send({ error: 'Client not found' });
      }

      return res.status(200).send(client);
    } catch (error) {
      console.error('Error in getClientById:', error);
      return res.status(500).send({ error: 'Failed to retrieve client' });
    }
  }
  async getAllClients(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clients = await clientService.getAllClients();
      return res.status(200).send(clients);
    } catch (error) {
      console.error('Error in getAllClients:', error);
      return res.status(500).send({ error: 'Failed to retrieve clients' });
    }
  }
  async updateClientWithPatch(req: FastifyRequest<{ Params: { id: number }; Body: Partial<Client> }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clientId = req.params.id;
      const clientData: Partial<Client> = req.body;

      const updatedClient = await clientService.updateClientWithPatch(clientId, clientData);

      if (!updatedClient) {
        return res.status(404).send({ error: 'Client not found' });
      }

      return res.status(200).send(updatedClient);
    } catch (error) {
      console.error('Error in updateClientWithPatch:', error);
      return res.status(500).send({ error: 'Failed to update client' });
    }
  }
  async updateClientWithPut(req: FastifyRequest<{ Params: { id: number }; Body: Client }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clientId = req.params.id;
      const clientData: Client = req.body;

      const updatedClient = await clientService.updateClientWithPut(clientId, clientData);

      if (!updatedClient) {
        return res.status(404).send({ error: 'Client not found' });
      }

      return res.status(200).send(updatedClient);
    } catch (error) {
      console.error('Error in updateClientWithPut:', error);
      return res.status(500).send({ error: 'Failed to update client' });
    }
  }
  async deleteClient(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const clientId = req.params.id;
      await clientService.deleteClient(clientId);
      return res.status(204).send();
    } catch (error) {
      console.error('Error in deleteClient:', error);
      return res.status(500).send({ error: 'Failed to delete client' });
    }
  }
}

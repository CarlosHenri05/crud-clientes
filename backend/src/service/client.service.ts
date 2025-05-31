import { Client, Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export class ClientService {
  async saveClient(clientData: Prisma.ClientCreateInput): Promise<Client> {
    try {
      const client = await prisma.client.create({
        data: clientData,
      });

      return client;
    } catch (error) {
      console.error('Error in saveClient:', error);
      throw error;
    }
  }

  async getClientById(clientId: number): Promise<Client | null> {
    try {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });
      return client;
    } catch (error) {
      console.error('Error in getClientByID:', error);
      throw error;
    }
  }

  async getAllClients(): Promise<Client[]> {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error) {
      console.error('Error in getAllClients: ', error);
      throw error;
    }
  }

  // Can update a client partially
  async updateClientWithPatch(clientId: number, clientData: Partial<Prisma.ClientCreateInput>): Promise<Client | null> {
    try {
      const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
      });
      return updatedClient;
    } catch (error) {
      console.error('Error in updateClientWithPatch:', error);
      throw error;
    }
  }

  // Only updates the entire client object
  async updateClientWithPut(clientId: number, clientData: Prisma.ClientCreateInput): Promise<Client | null> {
    try {
      const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
      });

      return updatedClient;
    } catch (error) {
      console.error('Error in updateClientWithPut:', error);
      throw error;
    }
  }

  async deleteClient(clientId: number): Promise<void> {
    try {
      await prisma.client.delete({
        where: { id: clientId },
      });
    } catch (error) {
      console.error('Error in deleteClient:', error);
      throw error;
    }
  }
}

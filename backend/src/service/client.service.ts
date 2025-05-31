import { Client, Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { AppError, NotFoundError, ConflictError } from '../utils/errors'; // Importa os erros customizados

export class ClientService {
  async saveClient(clientData: Prisma.ClientCreateInput): Promise<Client> {
    try {
      const client = await prisma.client.create({
        data: clientData,
      });
      return client;
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictError('Client with this email already exists');
      }
      console.error('Error in saveClient:', error);
      throw new AppError('Failed to save client', 500);
    }
  }

  async getClientById(clientId: number): Promise<Client | null> {
    try {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });
      if (!client) {
        throw new NotFoundError(`Client with ID ${clientId} not found`);
      }
      return client;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error in getClientByID:', error);
      throw new AppError('Failed to retrieve client', 500);
    }
  }

  async getAllClients(): Promise<Client[]> {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error: any) {
      console.error('Error in getAllClients: ', error);
      throw new AppError('Failed to retrieve clients', 500);
    }
  }

  async updateClientWithPatch(clientId: number, clientData: Partial<Prisma.ClientCreateInput>): Promise<Client | null> {
    try {
      const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
      });
      return updatedClient;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Client with ID ${clientId} not found for update`);
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictError('Client with this email already exists');
      }
      console.error('Error in updateClientWithPatch:', error);
      throw new AppError('Failed to update client', 500);
    }
  }

  async updateClientWithPut(clientId: number, clientData: Prisma.ClientCreateInput): Promise<Client | null> {
    try {
      const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
      });
      return updatedClient;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Client with ID ${clientId} not found for update`);
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictError('Client with this email already exists');
      }
      console.error('Error in updateClientWithPut:', error);
      throw new AppError('Failed to update client', 500);
    }
  }

  async deleteClient(id: number): Promise<void> {
    try {
      await prisma.client.delete({
        where: { id: id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Client with ID ${id} not found for deletion`);
      }
      console.error('Error in deleteClient:', error);
      throw new AppError('Failed to delete client', 500);
    }
  }
}

import { ClientService } from '../service/client.service';
import { prisma } from '../prisma';

jest.mock('../prisma', () => ({
  prisma: {
    client: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('ClientService', () => {
  const clientService = new ClientService();

  it('Should save a client', async () => {
    const mockClient = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };
    (prisma.client.create as jest.Mock).mockResolvedValue(mockClient);

    const result = await clientService.saveClient(mockClient);

    expect(result).toEqual(mockClient);
    expect(prisma.client.create).toHaveBeenCalledWith({ data: mockClient });
  });

  it('Should get a client by ID', async () => {
    const mockClient = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };

    (prisma.client.findUnique as jest.Mock).mockResolvedValue(mockClient);

    const result = await clientService.getClientById(1);

    expect(result).toEqual(mockClient);
    expect(prisma.client.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('Should get all clients', async () => {
    const mockClients = [
      {
        id: 1,
        name: 'Carlos',
        email: 'carlos@teste.com',
        status: true,
        assets: [],
      },
      {
        id: 2,
        name: 'Maria',
        email: 'Maria@teste.com',
        status: true,
        assets: [],
      },
    ];

    (prisma.client.findMany as jest.Mock).mockResolvedValue(mockClients);

    const result = await clientService.getAllClients();

    expect(result).toEqual(mockClients);
    expect(prisma.client.findMany).toHaveBeenCalledWith();
  });
  it('Should update a client with PATCH', async () => {
    const mockClient = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };

    const updatedData = {
      id: 1,
      name: 'Carlos Henrique',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };

    (prisma.client.update as jest.Mock).mockResolvedValue(updatedData);

    const result = await clientService.updateClientWithPatch(1, updatedData);

    expect(result).toEqual(updatedData);
    expect(prisma.client.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
  });

  it('Should update a client with PUT', async () => {
    const mockClient = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };
    const updatedData = {
      id: 1,
      name: 'Carlos Henrique',
      email: 'carlos@teste2.com',
      status: true,
      assets: [],
    };
    (prisma.client.update as jest.Mock).mockResolvedValue(updatedData);

    const result = await clientService.updateClientWithPut(1, updatedData);

    expect(result).toEqual(updatedData);
    expect(prisma.client.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
  });

  it('Should delete a client', async () => {
    const mockClient = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@teste.com',
      status: true,
      assets: [],
    };
    (prisma.client.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await clientService.deleteClient(1);

    expect(result).toBeUndefined();
    expect(prisma.client.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});

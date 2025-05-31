import { AssetService } from '../service/asset.service';
import { prisma } from '../prisma';
import { NotFoundError, ConflictError, AppError } from '../utils/errors'; // Importa os erros

jest.mock('../prisma', () => ({
  prisma: {
    asset: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('AssetService', () => {
  const assetService = new AssetService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should save an asset successfully', async () => {
    const mockAssetInput = {
      name: 'Asset1',
      value: 1000,

      client: { connect: { id: 1 } },
    };

    const mockAssetOutput = { ...mockAssetInput, id: 1, clientId: 1 };
    (prisma.asset.create as jest.Mock).mockResolvedValue(mockAssetOutput);

    const result = await assetService.saveAsset(mockAssetInput);
    expect(result).toEqual(mockAssetOutput);

    expect(prisma.asset.create).toHaveBeenCalledWith({ data: mockAssetInput });
  });

  it('Should throw ConflictError if saving an asset with unique constraint violation', async () => {
    const mockAssetInput = {
      name: 'Asset1',
      value: 1000,
      clientId: 1,
      client: { connect: { id: 1 } },
    };
    const prismaError = new Error('Unique constraint failed');
    (prismaError as any).code = 'P2002';
    (prisma.asset.create as jest.Mock).mockRejectedValue(prismaError);

    await expect(assetService.saveAsset(mockAssetInput)).rejects.toThrow(ConflictError);
    expect(prisma.asset.create).toHaveBeenCalledWith({ data: mockAssetInput });
  });

  it('Should get an asset by ID successfully', async () => {
    const mockAsset = { id: 1, name: 'Asset1', value: 1000, clientId: 1 };
    (prisma.asset.findUnique as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.getAssetById(1);
    expect(result).toEqual(mockAsset);
    expect(prisma.asset.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('Should throw NotFoundError when getting an asset by ID that does not exist', async () => {
    (prisma.asset.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(assetService.getAssetById(999)).rejects.toThrow(NotFoundError);
    expect(prisma.asset.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('Should get all assets successfully', async () => {
    const mockAssets = [
      { id: 1, name: 'Asset1', value: 1000, clientId: 1 },
      { id: 2, name: 'Asset2', value: 2000, clientId: 2 },
    ];
    (prisma.asset.findMany as jest.Mock).mockResolvedValue(mockAssets);

    const result = await assetService.getAllAssets();
    expect(result).toEqual(mockAssets);
    expect(prisma.asset.findMany).toHaveBeenCalledTimes(1);
  });

  it('Should update an asset with PATCH successfully', async () => {
    const updatedData = { name: 'Updated Asset', value: 1500 };
    const mockUpdatedAsset = { id: 1, name: 'Updated Asset', value: 1500, clientId: 1 };
    (prisma.asset.update as jest.Mock).mockResolvedValue(mockUpdatedAsset);

    const result = await assetService.updateAssetWithPatch(1, updatedData);
    expect(result).toEqual(mockUpdatedAsset);
    expect(prisma.asset.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updatedData });
  });

  it('Should throw NotFoundError when patching an asset that does not exist', async () => {
    const updatedData = { name: 'Updated Asset' };
    const prismaError = new Error('Record not found');
    (prismaError as any).code = 'P2025';
    (prisma.asset.update as jest.Mock).mockRejectedValue(prismaError);

    await expect(assetService.updateAssetWithPatch(999, updatedData)).rejects.toThrow(NotFoundError);
    expect(prisma.asset.update).toHaveBeenCalledWith({ where: { id: 999 }, data: updatedData });
  });

  it('Should update an asset with PUT successfully', async () => {
    const fullUpdateData = { name: 'Full Update', value: 3000, clientId: 1, client: { connect: { id: 1 } } };
    const mockUpdatedAsset = { id: 1, ...fullUpdateData };
    (prisma.asset.update as jest.Mock).mockResolvedValue(mockUpdatedAsset);

    const result = await assetService.updateAssetWithPut(1, fullUpdateData);
    expect(result).toEqual(mockUpdatedAsset);
    expect(prisma.asset.update).toHaveBeenCalledWith({ where: { id: 1 }, data: fullUpdateData });
  });

  it('Should throw NotFoundError when putting an asset that does not exist', async () => {
    const fullUpdateData = { name: 'Full Update', value: 3000, clientId: 1, client: { connect: { id: 1 } } };
    const prismaError = new Error('Record not found');
    (prismaError as any).code = 'P2025';
    (prisma.asset.update as jest.Mock).mockRejectedValue(prismaError);

    await expect(assetService.updateAssetWithPut(999, fullUpdateData)).rejects.toThrow(NotFoundError);
    expect(prisma.asset.update).toHaveBeenCalledWith({ where: { id: 999 }, data: fullUpdateData });
  });

  it('Should delete an asset successfully', async () => {
    (prisma.asset.delete as jest.Mock).mockResolvedValue({}); // delete retorna o objeto deletado ou nada

    const result = await assetService.deleteAsset(1);
    expect(result).toBeUndefined(); // delete retorna void (undefined)
    expect(prisma.asset.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('Should throw NotFoundError when deleting an asset that does not exist', async () => {
    const prismaError = new Error('Record to delete does not exist.');
    (prismaError as any).code = 'P2025';
    (prisma.asset.delete as jest.Mock).mockRejectedValue(prismaError);

    await expect(assetService.deleteAsset(999)).rejects.toThrow(NotFoundError);
    expect(prisma.asset.delete).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('Should throw AppError for generic database error when getting all assets', async () => {
    (prisma.asset.findMany as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

    await expect(assetService.getAllAssets()).rejects.toThrow(AppError);
  });

  it('Should return an asset or assets by client ID successfully', async () => {
    const mockAsset = { id: 1, name: 'Asset1', value: 1000, clientId: 1 };
    (prisma.asset.findMany as jest.Mock).mockResolvedValue([mockAsset]);

    const result = await assetService.getAssetsByClientId(1);
    expect(result).toEqual([mockAsset]);
    expect(prisma.asset.findMany).toHaveBeenCalledWith({ where: { clientId: 1 } });
  });
});

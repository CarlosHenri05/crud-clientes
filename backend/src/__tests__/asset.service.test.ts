import { AssetService } from '../service/asset.service';
import { prisma } from '../prisma';

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

  it('Should save an asset', async () => {
    const mockAsset = {
      name: 'Asset1',
      type: 'Type1',
      value: 1000,
      clientId: 1,
      client: {},
    };
    (prisma.asset.create as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.saveAsset(mockAsset);
  });

  it('Should get an asset by ID', async () => {
    const mockAsset = {
      id: 1,
      name: 'Asset1',
      value: 1000,
      clientId: 1,
      client: {},
    };
    (prisma.asset.findUnique as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.getAssetById(1);
    expect(result).toEqual(mockAsset);
  });
  it('Should get all assets', async () => {
    const mockAssets = [
      { id: 1, name: 'Asset1', value: 1000, clientId: 1, client: {} },
      { id: 2, name: 'Asset2', value: 2000, clientId: 2, client: {} },
    ];
    (prisma.asset.findMany as jest.Mock).mockResolvedValue(mockAssets);

    const result = await assetService.getAllAssets();
    expect(result).toEqual(mockAssets);
  });
  it('Should update an asset with PATCH', async () => {
    const mockAsset = {
      id: 1,
      name: 'Updated Asset',
      type: 'Type1',
      value: 1500,
      clientId: 1,
      client: {},
    };
    (prisma.asset.update as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.updateAssetWithPatch(1, { name: 'Updated Asset', value: 1500 });
    expect(result).toEqual(mockAsset);
  });
  it('Should update an asset with PUT', async () => {
    const mockAsset = {
      id: 1,
      name: 'Updated Asset',
      type: 'Type1',
      value: 1500,
      clientId: 1,
      client: {},
    };
    (prisma.asset.update as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.updateAssetWithPut(mockAsset.id, mockAsset);
    expect(result).toEqual(mockAsset);
  });
  it('Should delete an asset', async () => {
    const mockAsset = {
      id: 1,
      name: 'Asset1',
      type: 'Type1',
      value: 1000,
      clientId: 1,
      client: {},
    };
    (prisma.asset.delete as jest.Mock).mockResolvedValue(mockAsset);

    const result = await assetService.deleteAsset(1);
    expect(result).toEqual(mockAsset);
  });
});

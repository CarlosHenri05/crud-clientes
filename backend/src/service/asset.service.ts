import { Asset } from '@prisma/client';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

export class AssetService {
  async saveAsset(assetData: Prisma.AssetCreateInput): Promise<Asset> {
    try {
      const asset = await prisma.asset.create({
        data: assetData,
      });
      return asset;
    } catch (error) {
      console.error('Error in saveAsset:', error);
      throw error;
    }
  }

  async getAssetById(assetId: number): Promise<Asset | null> {
    try {
      const asset = await prisma.asset.findUnique({
        where: { id: assetId },
      });
      return asset;
    } catch (error) {
      console.error('Error in getAssetById:', error);
      throw error;
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    try {
      const assets = await prisma.asset.findMany();
      return assets;
    } catch (error) {
      console.error('Error in getAllAssets:', error);
      throw error;
    }
  }

  async updateAssetWithPatch(assetId: number, assetData: Partial<Prisma.AssetCreateInput>): Promise<Asset | null> {
    try {
      const updatedAsset = await prisma.asset.update({
        where: { id: assetId },
        data: assetData,
      });
      return updatedAsset;
    } catch (error) {
      console.error('Error in updateAssetWithPatch:', error);
      throw error;
    }
  }

  async updateAssetWithPut(assetId: number, assetData: Prisma.AssetCreateInput): Promise<Asset | null> {
    try {
      const updatedAsset = await prisma.asset.update({
        where: { id: assetId },
        data: assetData,
      });
      return updatedAsset;
    } catch (error) {
      console.error('Error in updateAssetWithPut:', error);
      throw error;
    }
  }
  async deleteAsset(assetId: number): Promise<void> {
    try {
      await prisma.asset.delete({
        where: { id: assetId },
      });
    } catch (error) {
      console.error('Error in deleteAsset:', error);
      throw error;
    }
  }
}

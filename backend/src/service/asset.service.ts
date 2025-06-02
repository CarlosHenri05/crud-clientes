// src/service/AssetService.ts
import { Asset, Prisma } from 'src/generated/prisma';
import { prisma } from '../prisma';
import { NotFoundError, AppError, ConflictError } from '../utils/errors'; // Importa os erros customizados

export class AssetService {
  async saveAsset(assetData: Prisma.AssetCreateInput): Promise<Asset> {
    try {
      const asset = await prisma.asset.create({
        data: assetData,
      });
      return asset;
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Exemplo: erro de unique constraint
        throw new ConflictError('Asset with this name/value already exists (or other unique constraint)');
      }
      console.error('Error in saveAsset:', error);
      throw new AppError('Failed to save asset', 500); // Lança um erro genérico de aplicação
    }
  }

  async getAssetById(assetId: number): Promise<Asset | null> {
    try {
      const asset = await prisma.asset.findUnique({
        where: { id: assetId },
      });
      if (!asset) {
        throw new NotFoundError(`Asset with ID ${assetId} not found`);
      }
      return asset;
    } catch (error: any) {
      // Se for um erro NotFoundError, relança. Caso contrário, lança AppError
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error in getAssetById:', error);
      throw new AppError('Failed to retrieve asset', 500);
    }
  }

  async getAssetsByClientId(clientId: number): Promise<Asset[] | null> {
    try {
      const asset = await prisma.asset.findMany({
        where: { clientId: clientId },
      });

      if (!asset) {
        throw new NotFoundError(`Asset for Client ID ${clientId}, not found`);
      }
      return asset;
    } catch (error: any) {
      console.error('Error in getAssetsByClientId:', error);
      throw new AppError('Failed to retrieve assets for client', 500);
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    try {
      const assets = await prisma.asset.findMany();
      return assets;
    } catch (error: any) {
      console.error('Error in getAllAssets:', error);
      throw new AppError('Failed to retrieve assets', 500);
    }
  }

  async updateAssetWithPatch(assetId: number, assetData: Partial<Prisma.AssetCreateInput>): Promise<Asset | null> {
    try {
      const updatedAsset = await prisma.asset.update({
        where: { id: assetId },
        data: assetData,
      });
      return updatedAsset;
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma ClientKnownRequestError for record not found
        throw new NotFoundError(`Asset with ID ${assetId} not found for update`);
      }
      console.error('Error in updateAssetWithPatch:', error);
      throw new AppError('Failed to update asset', 500);
    }
  }

  async updateAssetWithPut(assetId: number, assetData: Prisma.AssetCreateInput): Promise<Asset | null> {
    try {
      const updatedAsset = await prisma.asset.update({
        where: { id: assetId },
        data: assetData,
      });
      return updatedAsset;
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma ClientKnownRequestError for record not found
        throw new NotFoundError(`Asset with ID ${assetId} not found for update`);
      }
      console.error('Error in updateAssetWithPut:', error);
      throw new AppError('Failed to update asset', 500);
    }
  }

  async deleteAsset(assetId: number): Promise<void> {
    try {
      await prisma.asset.delete({
        where: { id: assetId },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma ClientKnownRequestError for record not found
        throw new NotFoundError(`Asset with ID ${assetId} not found for deletion`);
      }
      console.error('Error in deleteAsset:', error);
      throw new AppError('Failed to delete asset', 500);
    }
  }
}

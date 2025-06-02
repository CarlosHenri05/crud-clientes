import { AssetService } from '../service/asset.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError, NotFoundError, ConflictError, BadRequestError } from '../utils/errors';
import { CreateAssetSchema, UpdateAssetSchema, IdParamSchema, AssetSchema, IdClientParamSchema } from '../schema/asset.schema';
import { z } from 'zod';
import { Prisma } from 'src/generated/prisma';

const assetService = new AssetService();

export class AssetController {
  async saveAsset(req: FastifyRequest, res: FastifyReply) {
    try {
      const assetData = CreateAssetSchema.parse(req.body);
      const assetCreateInput = {
        name: assetData.name,
        value: assetData.value,
        Client: { connect: { id: assetData.clientId } },
      };
      const asset = await assetService.saveAsset(assetCreateInput);

      res.status(201).send(asset);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation with zod failed', errors: error.errors });
      }
      if (error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  async getAssetById(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const asset = await assetService.getAssetById(id);

      if (!asset) {
        throw new NotFoundError(`Asset with ID ${id} not found`);
      }
      return res.status(200).send(asset);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation with zod failed', errors: error.errors });
      }
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in getAssetById:', error);
      return res.status(500).send({ message: 'Failed to retrieve asset' });
    }
  }

  async getAssetsByClientId(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { clientId } = IdClientParamSchema.parse(req.params);
      const assets = await assetService.getAssetsByClientId(clientId);

      if (!assets || assets.length === 0) {
        throw new NotFoundError(`Assets for Client ID ${clientId} not found`);
      }
      return res.status(200).send(assets);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation with zod failed', errors: error.errors });
      }
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in getAssetsByClientId:', error);
      return res.status(500).send({ message: 'Failed to retrieve assets for client' });
    }
  }

  async getAllAssets(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const assets = await assetService.getAllAssets();
      return res.status(200).send(assets);
    } catch (error: any) {
      console.error('Error in getAllAssets:', error);
      return res.status(500).send({ message: 'Failed to retrieve assets' });
    }
  }
  async updateAssetWithPatch(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const updateData = UpdateAssetSchema.parse(req.body);

      const asset = await assetService.updateAssetWithPatch(id, updateData);
      if (!asset) {
        throw new NotFoundError(`Not found asset with ID ${id}`);
      }
      return res.status(200).send(asset);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation with zod failed', errors: error.errors });
      }

      if (error instanceof NotFoundError || error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in updateAssetWithPatch:', error);
      return res.status(500).send({ message: 'Failed to update asset' });
    }
  }
  async updateAssetWithPut(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const updateData = UpdateAssetSchema.parse(req.body);

      const asset = await assetService.updateAssetWithPut(id, <Prisma.AssetCreateInput>updateData);
      if (!asset) {
        throw new NotFoundError(`Not found asset with ID ${id}`);
      }
      return res.status(200).send(asset);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: 'Validation with zod failed', errors: error.errors });
      }

      if (error instanceof NotFoundError || error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in updateAssetWithPatch:', error);
      return res.status(500).send({ message: 'Failed to update asset' });
    }
  }
  async deleteAsset(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { id } = IdParamSchema.parse(req.params);

      await assetService.deleteAsset(id);

      return res.status(204).send();
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      if (error instanceof ConflictError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      console.error('Error in deleteAsset:', error);
      return res.status(500).send({ message: 'Failed to delete asset' });
    }
  }
}

import { AssetController } from '../controller/asset.controller';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateAssetSchema, UpdateAssetSchema, IdParamSchema, AssetSchema, IdClientParamSchema } from '../schema/asset.schema';

const jsonSchema = require('zod-to-json-schema').default;

const assetController = new AssetController();

const createAssetBodySchema = jsonSchema(CreateAssetSchema, { $refStrategy: 'none' });
const updateAssetPatchBodySchema = jsonSchema(UpdateAssetSchema, { $refStrategy: 'none' });
const idParamJsonSchema = jsonSchema(IdParamSchema, { $refStrategy: 'none' });
const idClientParamJsonSchema = jsonSchema(IdClientParamSchema, { $refStrategy: 'none' });

export async function assetRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /assets
  fastify.get(
    '/assets',
    {
      schema: {
        summary: 'Get all assets',
        description: 'Retrieves all assets from the database',
        tags: ['Assets'],
      },
    },
    assetController.getAllAssets
  );

  // GET /assets/:id
  fastify.get(
    '/assets/:id',
    {
      schema: {
        summary: 'Get asset by ID',
        description: 'Retrieves a specific asset by its ID',
        tags: ['Assets'],
        params: idParamJsonSchema,
      },
    },
    assetController.getAssetById
  );

  // GET /assets/client/:clientId
  fastify.get(
    '/assets/client/:clientId',
    {
      schema: {
        summary: 'Get assets by client ID',
        description: 'Retrieves all assets associated with a specific client ID',
        tags: ['Assets'],
        params: idClientParamJsonSchema,
      },
    },
    assetController.getAssetsByClientId
  );

  // POST /assets
  fastify.post(
    '/assets',
    {
      schema: {
        summary: 'Create a new asset',
        description: 'Creates a new asset in the database',
        tags: ['Assets'],
        body: createAssetBodySchema,
      },
    },
    assetController.saveAsset
  );

  // PATCH /assets/:id
  fastify.patch(
    '/assets/:id',
    {
      schema: {
        summary: 'Update asset with PATCH',
        description: 'Updates an existing asset partially using PATCH method',
        tags: ['Assets'],
        params: idParamJsonSchema,
        body: updateAssetPatchBodySchema,
      },
    },
    assetController.updateAssetWithPatch
  );
  // PUT /assets/:id
  fastify.put(
    '/assets/:id',
    {
      schema: {
        summary: 'Update asset with PUT',
        description: 'Updates an existing asset completely using PUT method',
        tags: ['Assets'],
        params: idParamJsonSchema,
        body: updateAssetPatchBodySchema,
      },
    },
    assetController.updateAssetWithPut
  );
  fastify.delete(
    '/assets/:id',
    {
      schema: {
        summary: 'Delete asset by ID',
        description: 'Deletes a specific asset by its ID',
        tags: ['Assets'],
        params: idParamJsonSchema,
      },
    },
    assetController.deleteAsset
  );
}

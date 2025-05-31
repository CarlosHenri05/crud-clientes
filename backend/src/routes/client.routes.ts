// src/routes/client.routes.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ClientController } from '../controller/client.controller';
// import { AssetController } from '../controller/asset.controller';

const clientController = new ClientController();
// const assetController = new AssetController();

export async function clientRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/clients', clientController.getAllClients);
  fastify.get('/clients/:id', clientController.getClientById);
  fastify.post('/clients', clientController.saveClient);
  fastify.patch('/clients/:id', clientController.updateClientWithPatch);
  fastify.put('/clients/:id', clientController.updateClientWithPut);
  fastify.delete('/clients/:id', clientController.deleteClient);

  // fastify.post('/assets', assetController.saveAsset);
  // fastify.get('/assets/:id', assetController.getAssetById);
  // fastify.get('/assets', assetController.getAllAssets);
  // fastify.patch('/assets/:id', assetController.updateAssetWithPatch);
  // fastify.put('/assets/:id', assetController.updateAssetWithPut);
  // fastify.delete('/assets/:id', assetController.deleteAsset);
}

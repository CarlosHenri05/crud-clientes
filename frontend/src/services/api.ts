import axios from 'axios';
import { Client, Asset } from '../types/types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientService = {
  getAllClients: async (): Promise<Client[]> => {
    const response = await apiClient.get('/clients');
    return response.data;
  },
  getClientById: async (id: number): Promise<Client> => {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  },
  postClient: async (clientData: Omit<Client, 'id' | 'assets'>): Promise<Client> => {
    const response = await apiClient.post('/clients', clientData);
    return response.data;
  },
  updateClientWithPatch: async (idClient: number, clientData: Partial<Omit<Client, 'id' | 'assets'>>): Promise<Client> => {
    const response = await apiClient.patch(`/clients/${idClient}`, clientData);
    return response.data;
  },
  updateClientWithPut: async (idClient: number, clientData: Omit<Client, 'id' | 'assets'>): Promise<Client> => {
    const response = await apiClient.put(`/clients/:${idClient}`);
    return response.data;
  },
  deleteClient: async (idClient: number): Promise<void> => {
    await apiClient.delete(`/clients/${idClient}`);
  },
};

export const assetService = {
  getAllAssets: async (): Promise<Asset[]> => {
    const response = await apiClient.get('/assets');
    return response.data;
  },
  getAssetById: async (idAsset: number): Promise<Asset> => {
    const response = await apiClient.get(`/assets/${idAsset}`);
    return response.data;
  },
  getAssetByClientId: async (clientId: number): Promise<Asset[]> => {
    const response = await apiClient.get(`/assets/client/${clientId}`);
    return response.data;
  },
  postAsset: async (assetData: Omit<Asset, 'id' | 'client'>): Promise<Asset> => {
    const response = await apiClient.post('/assets', assetData);
    return response.data;
  },
  updateAssetWithPatch: async (assetId: number, assetData: Partial<Omit<Asset, 'id' | 'client'>>): Promise<Asset> => {
    const response = await apiClient.patch(`/assets/${assetId}`, assetData);
    return response.data;
  },
  updateAssetWithPut: async (assetId: number, assetData: Omit<Asset, 'id' | 'client'>): Promise<Asset> => {
    const response = await apiClient.put(`/assets/${assetId}`, assetData);
    return response.data;
  },
  deleteAsset: async (assetId: number): Promise<void> => {
    await apiClient.delete(`/assets/${assetId}`);
  },
};

'use client';
import React, { useState, useEffect } from 'react';
import { clientService, assetService } from '../services/api';
import { Client, Asset } from '../types/types';
import ClientTable from '@/components/ClientTable';
import AssetTable from '../components/AssetTable';
import ClientForm from '../components/ClientForm';
import AssetForm from '../components/AssetForm';
import Modal from '../components/Modal';

const DashboardPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | undefined>(undefined);
  const [isAssetFormOpen, setIsAssetFormOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientsData = await clientService.getAllClients();
        setClients(clientsData);
        const assetsData = await assetService.getAllAssets();
        setAssets(assetsData);
      } catch (err: any) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClientFormSuccess = () => {
    setIsClientFormOpen(false);
    setClientToEdit(undefined);
    clientService.getAllClients().then(setClients).catch(console.error);
  };

  const handleClientFormCancel = () => {
    setIsClientFormOpen(false);
    setClientToEdit(undefined);
  };

  const handleEditClient = (client: Client) => {
    setClientToEdit(client);
    setIsClientFormOpen(true);
  };

  const handleAssetFormSuccess = () => {
    setIsAssetFormOpen(false);
    setAssetToEdit(undefined);
    assetService.getAllAssets().then(setAssets).catch(console.error);
  };

  const handleAssetFormCancel = () => {
    setIsAssetFormOpen(false);
    setAssetToEdit(undefined);
  };

  const handleEditAsset = (asset: Asset) => {
    setAssetToEdit(asset);
    setIsAssetFormOpen(true);
  };

  const handleDeleteClient = async (id: number) => {
    console.log('Deletando Cliente - ID:', id, 'Tipo:', typeof id);
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clientService.deleteClient(id);
        const updatedClients = await clientService.getAllClients();
        setClients(updatedClients);
        alert('Cliente excluído com sucesso!');
      } catch (err: any) {
        console.error('Erro ao excluir cliente:', err);
        alert('Erro ao excluir cliente.');
      }
    }
  };

  const handleDeleteAsset = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este ativo?')) {
      try {
        await assetService.deleteAsset(id);
        const updatedAssets = await assetService.getAllAssets();
        setAssets(updatedAssets);
        alert('Ativo excluído com sucesso!');
      } catch (err: any) {
        console.error('Erro ao excluir ativo:', err);
        alert('Erro ao excluir ativo.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Clientes e Ativos</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Clientes</h2>
            <button
              onClick={() => {
                setClientToEdit(undefined);
                setIsClientFormOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
              Adicionar Novo Cliente
            </button>
            <ClientTable clients={clients} onDelete={handleDeleteClient} onEdit={handleEditClient} /> {/* << Passa onEdit */}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Ativos</h2>
            <button
              onClick={() => {
                setAssetToEdit(undefined);
                setIsAssetFormOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
              Adicionar Ativo
            </button>
            <AssetTable assets={assets} onDelete={handleDeleteAsset} onEdit={handleEditAsset} />
          </div>
        </div>
      )}

      <Modal isOpen={isClientFormOpen} onClose={handleClientFormCancel} title={clientToEdit ? 'Editar Cliente' : 'Adicionar Novo Cliente'}>
        <ClientForm onSuccess={handleClientFormSuccess} onCancel={handleClientFormCancel} clientToEdit={clientToEdit} />
      </Modal>

      <Modal isOpen={isAssetFormOpen} onClose={handleAssetFormCancel} title={assetToEdit ? 'Editar Ativo' : 'Adicionar Novo Ativo'}>
        <AssetForm onSuccess={handleAssetFormSuccess} onCancel={handleAssetFormCancel} clients={clients} assetToEdit={assetToEdit} />
      </Modal>
    </div>
  );
};

export default DashboardPage;

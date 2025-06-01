// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { clientService, assetService } from '../services/api';
import { Client, Asset } from '../types/types';
import ClientTable from '@/components/ClientTable';
import AssetTable from '../components/AssetTable';
import AssetForm from '@/components/AssetForm';
import ClientForm from '../components/ClientForm'; // Importe o novo formulário
import Modal from '../components/Modal'; // Importe o componente Modal

const DashboardPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false); // Estado para controlar o modal do formulário
  const [isAssetFormOpen, setIsAssetFormOpen] = useState(false);

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
    setIsClientFormOpen(false); // Fecha o modal
    // Recarrega a lista de clientes após o sucesso
    clientService.getAllClients().then(setClients).catch(console.error);
  };

  const handleClientFormCancel = () => {
    setIsClientFormOpen(false); // Fecha o modal
  };

  const handleAssetFormSuccess = () => {
    setIsAssetFormOpen(false);
    assetService.getAllAssets().then(setAssets).catch(console.error);
  };

  const handleAssetFormCancel = () => {
    setIsAssetFormOpen(false);
  };
  // FIM das novas funções

  const handleDeleteClient = async (id: number) => {
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
          {/* Tabela de Clientes */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Clientes</h2>
            <button onClick={() => setIsClientFormOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
              Adicionar Novo Cliente
            </button>
            <ClientTable clients={clients} onDelete={handleDeleteClient} />
          </div>

          {/* Tabela de Ativos */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Ativos</h2>
            <button onClick={() => setIsAssetFormOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
              Adicionar ativo
            </button>
            <AssetTable assets={assets} onDelete={handleDeleteAsset} />
          </div>
        </div>
      )}

      {/* Modal para Adicionar Cliente */}
      <Modal isOpen={isClientFormOpen} onClose={handleClientFormCancel} title="Adicionar Novo Cliente">
        <ClientForm onSuccess={handleClientFormSuccess} onCancel={handleClientFormCancel} />
      </Modal>
      <Modal isOpen={isAssetFormOpen} onClose={handleAssetFormCancel} title="Adicionar Novo Ativo">
        <AssetForm onSuccess={handleAssetFormSuccess} onCancel={handleAssetFormCancel} clients={clients} />
      </Modal>
    </div>
  );
};

export default DashboardPage;

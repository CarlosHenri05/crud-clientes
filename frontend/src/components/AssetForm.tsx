// src/components/AssetForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { assetService } from '../services/api';
import { Asset, Client } from '../types/types';

interface AssetFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  clients: Client[]; // Lista de clientes para o dropdown de associação
  assetToEdit?: Asset; // << NOVO: Ativo a ser editado (opcional)
}

const AssetForm: React.FC<AssetFormProps> = ({ onSuccess, onCancel, clients, assetToEdit }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number>(0);
  const [clientId, setClientId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assetToEdit) {
      setName(assetToEdit.name);
      setValue(assetToEdit.value);
      setClientId(assetToEdit.clientId);
    } else {
      setName('');
      setValue(0);
      setClientId('');
    }
  }, [assetToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || value <= 0 || !clientId) {
      setError('Por favor, preencha todos os campos obrigatórios e um valor válido.');
      setLoading(false);
      return;
    }

    try {
      if (assetToEdit) {
        const updatedAssetData: Partial<Omit<Asset, 'id' | 'Client'>> = {
          name,
          value: parseFloat(value.toString()),
          clientId: parseInt(clientId.toString()),
        };
        await assetService.updateAssetWithPatch(assetToEdit.id, updatedAssetData);
        alert('Ativo atualizado com sucesso!');
      } else {
        const newAssetData: Omit<Asset, 'id' | 'Client'> = {
          name,
          value: parseFloat(value.toString()),
          clientId: parseInt(clientId.toString()),
        };
        await assetService.postAsset(newAssetData);
        alert('Ativo criado com sucesso!');
      }
      onSuccess();
    } catch (err: any) {
      console.error(`Erro ao ${assetToEdit ? 'atualizar' : 'criar'} ativo:`, err.response?.data || err.message);
      setError(`Erro ao ${assetToEdit ? 'atualizar' : 'criar'} ativo: ${err.response?.data?.message || 'Verifique os dados.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {assetToEdit ? 'Editar Ativo' : 'Adicionar Novo Ativo'} {/* << Título dinâmico */}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="assetName" className="block text-gray-700 text-sm font-bold mb-2">
            Nome do Ativo:
          </label>
          <input
            type="text"
            id="assetName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="value" className="block text-gray-700 text-sm font-bold mb-2">
            Valor:
          </label>
          <input
            type="number"
            id="value"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="clientId" className="block text-gray-700 text-sm font-bold mb-2">
            Cliente Associado:
          </label>
          <select
            id="clientId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={clientId}
            onChange={(e) => setClientId(parseInt(e.target.value))}
            required
          >
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} (ID: {client.id})
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
            {loading ? (assetToEdit ? 'Atualizando...' : 'Adicionando...') : assetToEdit ? 'Salvar Alterações' : 'Adicionar Ativo'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;

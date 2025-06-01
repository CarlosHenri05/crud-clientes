// src/components/ClientForm.tsx
'use client';

import React, { useState } from 'react';
import { clientService } from '../services/api';
import { Client } from '../types/types';

interface ClientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newClientData: Omit<Client, 'id' | 'assets'> = {
        name,
        email,
        status,
      };

      await clientService.postClient(newClientData);
      alert('Cliente criado com sucesso!');
      onSuccess();
    } catch (err: any) {
      console.error('Erro ao criar cliente:', err.response?.data || err.message);
      setError(`Erro ao criar cliente: ${err.response?.data?.message || 'Verifique os dados.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Adicionar Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 flex items-center">
          <input type="checkbox" id="status" className="mr-2 leading-tight" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          <label htmlFor="status" className="text-sm text-gray-700">
            Ativo
          </label>
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
            {loading ? 'Adicionando...' : 'Adicionar Cliente'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;

import React from 'react';
import { Client } from '../types/types';

interface ClientTableProps {
  clients: Client[];
  onDelete: (id: number) => void;
  onEdit: (client: Client) => void; //
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Nome</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Email</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Status</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                Nenhum cliente encontrado.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-2 px-4">{client.id}</td>
                <td className="py-2 px-4">{client.name}</td>
                <td className="py-2 px-4">{client.email}</td>
                <td className="py-2 px-4">{client.status ? 'Ativo' : 'Inativo'}</td>
                <td className="py-2 px-4">
                  <button onClick={() => onEdit(client)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    Editar
                  </button>
                  <button onClick={() => onDelete(client.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

// src/components/AssetTable.tsx
import React from 'react';
import { Asset } from '../types/types';
interface AssetTableProps {
  assets: Asset[];
  onDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ assets, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Nome</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Valor</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">ID do Cliente</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {assets.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                Nenhum ativo encontrado.
              </td>
            </tr>
          ) : (
            assets.map((asset) => (
              <tr key={asset.id} className="border-b">
                {' '}
                <td className="py-2 px-4">{asset.id}</td>
                <td className="py-2 px-4">{asset.name}</td>
                <td className="py-2 px-4">R$ {asset.value.toFixed(2)}</td>
                <td className="py-2 px-4">{asset.clientId}</td>
                <td className="py-2 px-4">
                  <button onClick={() => onEdit(asset)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    Editar
                  </button>
                  <button onClick={() => onDelete(asset.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

export default AssetTable;

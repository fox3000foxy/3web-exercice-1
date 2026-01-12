import React, { useState } from 'react';
import { DataType, Utilisateur } from '../types';

interface CommandesProps {
  data: DataType;
  currentUser: Utilisateur | null;
}

const Commandes: React.FC<CommandesProps> = ({ data, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { commandes, utilisateurs, produits } = data;

  // Enrichir les données de commandes
  const enrichedOrders = commandes
    .map(order => {
      const user = utilisateurs.find(u => u.id === order.utilisateurId);
      const product = produits.find(p => p.id === order.produitId);
      return {
        ...order,
        userName: user?.nomComplet || 'Inconnu',
        userPromo: user?.promo || '',
        productName: product?.nom || 'Produit inconnu',
        productPrice: product?.prix || 0,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filtrage
  const filteredOrders = enrichedOrders.filter(order => {
    const matchesSearch = order.userName.toLowerCase().includes(searchTerm.toLowerCase()) || order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUser === 'all' || order.utilisateurId.toString() === selectedUser;
    return matchesSearch && matchesUser;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.montant, 0);
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
          <i className='fas fa-shopping-cart text-blue-600'></i>
          Historique des Commandes
        </h1>
        <p className='text-gray-600 mt-1'>
          {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} enregistrée{filteredOrders.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Commandes</p>
              <p className='text-2xl font-bold text-gray-900'>{totalOrders}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-shopping-cart text-white text-lg'></i>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Revenu Total</p>
              <p className='text-2xl font-bold text-green-600'>{totalRevenue.toFixed(2)} €</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-euro-sign text-white text-lg'></i>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Panier Moyen</p>
              <p className='text-2xl font-bold text-purple-600'>{averageOrder.toFixed(2)} €</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-chart-line text-white text-lg'></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <i className='fas fa-search mr-2'></i>
              Rechercher
            </label>
            <input
              type='text'
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder='Utilisateur ou produit...'
              className='input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <i className='fas fa-user mr-2'></i>
              Utilisateur
            </label>
            <select
              value={selectedUser}
              onChange={e => {
                setSelectedUser(e.target.value);
                setCurrentPage(1);
              }}
              className='input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
              <option value='all'>Tous les utilisateurs</option>
              {utilisateurs.map(user => (
                <option key={user.id} value={user.id.toString()}>
                  {user.nomComplet} ({user.promo})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Utilisateur</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Produit</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Quantité</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Montant</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {paginatedOrders.map(order => (
                <tr key={order.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm'>
                      <p className='font-medium text-gray-900'>{formatDate(order.date)}</p>
                      <p className='text-gray-500'>{formatTime(order.date)}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm'>
                      <p className='font-medium text-gray-900'>{order.userName}</p>
                      <p className='text-gray-500'>{order.userPromo}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm font-medium text-gray-900'>{order.productName}</p>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm font-semibold text-gray-900'>{order.quantite}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm font-bold text-green-600'>{order.montant.toFixed(2)} €</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between'>
            <div className='text-sm text-gray-700'>
              Affichage {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredOrders.length)} sur {filteredOrders.length} résultats
            </div>
            <div className='flex items-center gap-2'>
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                <i className='fas fa-chevron-left'></i>
              </button>
              <span className='text-sm text-gray-700'>
                Page {currentPage} sur {totalPages}
              </span>
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                <i className='fas fa-chevron-right'></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commandes;

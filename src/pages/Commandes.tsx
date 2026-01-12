import React, { useState } from 'react';
import { Card, PageHeader, Pagination, SearchInput, SelectFilter, StatCard } from '../components';
import { usePagination, useSearch } from '../hooks';
import { DataType, Utilisateur } from '../types';
import { formatDate, formatTime } from '../utils/formatters';

interface CommandesProps {
  data: DataType;
  currentUser: Utilisateur | null;
}

const Commandes: React.FC<CommandesProps> = ({ data, currentUser }) => {
  const { searchTerm, handleSearchChange } = useSearch();
  const [selectedUser, setSelectedUser] = useState<string>('all');

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

  const { currentPage, totalPages, paginatedItems: paginatedOrders, startIndex, setCurrentPage, resetPage } = usePagination({
    items: filteredOrders,
    itemsPerPage: 10,
  });

  // Stats
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.montant, 0);
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader
        title="Historique des Commandes"
        subtitle={`${filteredOrders.length} commande${filteredOrders.length > 1 ? 's' : ''} enregistrée${filteredOrders.length > 1 ? 's' : ''}`}
        icon="shopping-cart"
        iconColor="blue"
      />

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <StatCard
          label='Total Commandes'
          value={totalOrders}
          icon='shopping-cart'
          iconColorFrom='blue-500'
          iconColorTo='blue-600'
        />
        <StatCard
          label='Revenu Total'
          value={`${totalRevenue.toFixed(2)} €`}
          icon='euro-sign'
          iconColorFrom='green-500'
          iconColorTo='emerald-600'
          valueColor='green-600'
        />
        <StatCard
          label='Panier Moyen'
          value={`${averageOrder.toFixed(2)} €`}
          icon='chart-line'
          iconColorFrom='purple-500'
          iconColorTo='purple-600'
          valueColor='purple-600'
        />
      </div>

      {/* Filtres */}
      <Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SearchInput
            value={searchTerm}
            onChange={value => handleSearchChange(value, resetPage)}
            placeholder="Utilisateur ou produit..."
            label="Rechercher"
          />
          <SelectFilter
            value={selectedUser}
            onChange={value => {
              setSelectedUser(value);
              resetPage();
            }}
            label="Utilisateur"
            icon="user"
            options={[
              { value: 'all', label: 'Tous les utilisateurs' },
              ...utilisateurs.map(user => ({
                value: user.id.toString(),
                label: `${user.nomComplet} (${user.promo})`
              }))
            ]}
          />
        </div>
      </Card>

      {/* Vue Mobile - Cartes */}
      <div className='md:hidden space-y-4'>
        {paginatedOrders.map(order => (
          <Card key={order.id} hover>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>{order.productName}</p>
                  <p className='text-xs text-gray-500'>{formatDate(order.date)} à {formatTime(order.date)}</p>
                </div>
                <p className='text-lg font-bold text-blue-600'>{order.montant.toFixed(2)} €</p>
              </div>
              
              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <p className='text-gray-500 text-xs'>Utilisateur</p>
                  <p className='text-gray-900 font-medium truncate'>{order.userName}</p>
                  <p className='text-gray-500 text-xs'>{order.userPromo}</p>
                </div>
                <div className='text-right'>
                  <p className='text-gray-500 text-xs'>Quantité</p>
                  <p className='text-gray-900 font-semibold text-lg'>{order.quantite}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Vue Desktop - Tableau */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden md:block'>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={10}
          totalItems={filteredOrders.length}
          startIndex={startIndex}
        />
      </div>
    </div>
  );
};

export default Commandes;

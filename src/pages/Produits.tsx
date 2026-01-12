import React, { useState } from 'react';
import { Badge, Card, PageHeader, Pagination, SearchInput, SelectFilter, StatCard } from '../components';
import { usePagination, useSearch } from '../hooks';
import { DataType, Utilisateur } from '../types';

interface ProduitsProps {
  data: DataType;
  currentUser: Utilisateur | null;
}

const Produits: React.FC<ProduitsProps> = ({ data, currentUser }) => {
  const { searchTerm, handleSearchChange } = useSearch();
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const { produits } = data;

  // Filtrage
  const filteredProducts = produits.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && product.actif) || (statusFilter === 'inactive' && !product.actif);
    return matchesSearch && matchesStatus;
  });

  const { currentPage, totalPages, paginatedItems: paginatedProducts, startIndex, setCurrentPage, resetPage } = usePagination({
    items: filteredProducts,
    itemsPerPage: 8,
  });

  // Stats
  const activeProducts = produits.filter(p => p.actif).length;
  const inactiveProducts = produits.filter(p => !p.actif).length;
  const totalProducts = produits.length;

  const toggleProductStatus = (productId: number) => {
    if (!currentUser?.estAdmin) {
      alert('Seuls les administrateurs peuvent modifier les produits');
      return;
    }
    alert(`Changement de statut du produit #${productId}`);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader
        title="Gestion des Produits"
        subtitle={`${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''} trouvé${filteredProducts.length > 1 ? 's' : ''}`}
        icon="box"
        iconColor="blue"
      />

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <StatCard
          label='Total'
          value={totalProducts}
          icon='box'
          iconColorFrom='blue-500'
          iconColorTo='blue-600'
        />
        <StatCard
          label='Actifs'
          value={activeProducts}
          icon='check-circle'
          iconColorFrom='green-500'
          iconColorTo='emerald-600'
          valueColor='green-600'
        />
        <StatCard
          label='Inactifs'
          value={inactiveProducts}
          icon='times-circle'
          iconColorFrom='red-500'
          iconColorTo='rose-600'
          valueColor='red-600'
        />
      </div>

      {/* Filtres */}
      <Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SearchInput
            value={searchTerm}
            onChange={value => handleSearchChange(value, resetPage)}
            placeholder="Nom du produit..."
            label="Rechercher"
          />
          <SelectFilter
            value={statusFilter}
            onChange={value => {
              setStatusFilter(value as 'all' | 'active' | 'inactive');
              resetPage();
            }}
            label="Statut"
            icon="filter"
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'active', label: 'Actifs seulement' },
              { value: 'inactive', label: 'Inactifs seulement' }
            ]}
          />
        </div>
      </Card>

      {/* Grille de Produits */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {paginatedProducts.map(product => (
          <div key={product.id} className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${product.actif ? 'border-gray-200' : 'border-gray-300 bg-gray-50'}`}>
            <div className='p-5'>
              <div className='flex items-start justify-between mb-3'>
                <h3 className={`font-semibold text-sm flex-1 ${product.actif ? 'text-gray-900' : 'text-gray-500'}`}>{product.nom}</h3>
                <button onClick={() => toggleProductStatus(product.id)}>
                  <Badge variant={product.actif ? 'green' : 'gray'} icon={product.actif ? 'check-circle' : 'times-circle'} size="sm">
                    {product.actif ? 'Actif' : 'Inactif'}
                  </Badge>
                </button>
              </div>

              <div className='mb-4'>
                <p className='text-2xl font-bold text-blue-600'>{product.prix.toFixed(2)} €</p>
              </div>

              <div className='flex items-center gap-2'>
                {currentUser?.estAdmin && (
                  <>
                    <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm'>
                      <i className='fas fa-edit mr-1.5'></i>
                      Modifier
                    </button>
                    <button className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm'>
                      <i className='fas fa-trash'></i>
                    </button>
                  </>
                )}
                {!currentUser?.estAdmin && (
                  <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm' disabled={!product.actif}>
                    <i className='fas fa-shopping-cart mr-1.5'></i>
                    Commander
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Card padding="none">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={8}
          totalItems={filteredProducts.length}
          startIndex={startIndex}
        />
      </Card>
    </div>
  );
};

export default Produits;

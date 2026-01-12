import React, { useState } from 'react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import SelectFilter from '../components/SelectFilter';
import { DataType, Utilisateur } from '../types';

interface ProduitsProps {
  data: DataType;
  currentUser: Utilisateur | null;
}

const Produits: React.FC<ProduitsProps> = ({ data, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { produits } = data;

  // Filtrage
  const filteredProducts = produits.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && product.actif) || (statusFilter === 'inactive' && !product.actif);
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total</p>
              <p className='text-2xl font-bold text-gray-900'>{totalProducts}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-box text-white text-lg'></i>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Actifs</p>
              <p className='text-2xl font-bold text-green-600'>{activeProducts}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-check-circle text-white text-lg'></i>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Inactifs</p>
              <p className='text-2xl font-bold text-red-600'>{inactiveProducts}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-md'>
              <i className='fas fa-times-circle text-white text-lg'></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SearchInput
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            placeholder="Nom du produit..."
            label="Rechercher"
          />
          <SelectFilter
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value as 'all' | 'active' | 'inactive');
              setCurrentPage(1);
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
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          startIndex={startIndex}
        />
      </Card>
    </div>
  );
};

export default Produits;

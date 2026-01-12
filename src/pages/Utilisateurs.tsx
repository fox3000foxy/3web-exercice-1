import React, { useState } from 'react';
import { Badge, Card, PageHeader, Pagination, SearchInput, SelectFilter } from '../components';
import { DataType, Utilisateur } from '../types';

interface UtilisateursProps {
  data: DataType;
  currentUser: Utilisateur | null;
}

const Utilisateurs: React.FC<UtilisateursProps> = ({ data, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPromo, setSelectedPromo] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { utilisateurs } = data;

  // Filtrage
  const filteredUsers = utilisateurs.filter(user => {
    const matchesSearch = user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.codeAdherent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPromo = selectedPromo === 'all' || user.promo === selectedPromo;
    return matchesSearch && matchesPromo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Get unique promos
  const promos = Array.from(new Set(utilisateurs.map(u => u.promo))).sort();

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Gestion des Utilisateurs'
        subtitle={`${filteredUsers.length} utilisateur${filteredUsers.length > 1 ? 's' : ''} au total`}
        icon='fa-users'
        iconColor='text-blue-600'
      />

      <Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SearchInput
            label='Rechercher'
            value={searchTerm}
            onChange={value => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            placeholder='Nom, email ou code étudiant...'
            icon='fa-search'
          />
          <SelectFilter
            label='Promo'
            value={selectedPromo}
            onChange={value => {
              setSelectedPromo(value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'all', label: 'Toutes les promos' },
              ...promos.map(promo => ({ value: promo, label: promo }))
            ]}
            icon='fa-graduation-cap'
          />
        </div>
      </Card>

      <Card padding='none' className='overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Utilisateur</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Promo</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Code Étudiant</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Rôle</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {paginatedUsers.map(user => (
                <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${user.estAdmin ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                        {user.nomComplet
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>{user.nomComplet}</p>
                        <p className='text-xs text-gray-500'>{user.points} tampons</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{user.promo}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-600'>{user.email}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded'>{user.codeAdherent}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.estAdmin ? (
                      <Badge variant='orange' icon='fa-shield-alt'>
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant='blue' icon='fa-user'>
                        Utilisateur
                      </Badge>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      <button className='text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors'>
                        <i className='fas fa-edit'></i>
                      </button>
                      <button className='text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors'>
                        <i className='fas fa-shopping-cart'></i>
                      </button>
                      {currentUser?.estAdmin && (
                        <button className='text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors'>
                          <i className='fas fa-trash'></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
            startIndex={startIndex}
          />
        )}
      </Card>
    </div>
  );
};

export default Utilisateurs;

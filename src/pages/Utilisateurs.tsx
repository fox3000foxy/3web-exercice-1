import React, { useState } from 'react';
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
    const filteredUsers = utilisateurs.filter((user) => {
        const matchesSearch =
            user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.codeAdherent.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPromo = selectedPromo === 'all' || user.promo === selectedPromo;
        return matchesSearch && matchesPromo;
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    // Get unique promos
    const promos = Array.from(new Set(utilisateurs.map((u) => u.promo))).sort();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-users text-blue-600"></i>
                    Gestion des Utilisateurs
                </h1>
                <p className="text-gray-600 mt-1">
                    {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} au total
                </p>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-search mr-2"></i>
                            Rechercher
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Nom, email ou code étudiant..."
                            className="input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-graduation-cap mr-2"></i>
                            Promo
                        </label>
                        <select
                            value={selectedPromo}
                            onChange={(e) => {
                                setSelectedPromo(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Toutes les promos</option>
                            {promos.map((promo) => (
                                <option key={promo} value={promo}>
                                    {promo}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Utilisateur
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Promo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Code Étudiant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Rôle
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                                                user.estAdmin
                                                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                                                    : 'bg-gradient-to-br from-blue-500 to-blue-600'
                                            }`}>
                                                {user.nomComplet.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.nomComplet}</p>
                                                <p className="text-xs text-gray-500">{user.points} tampons</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{user.promo}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                            {user.codeAdherent}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.estAdmin ? (
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit">
                                                <i className="fas fa-shield-alt"></i>
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit">
                                                <i className="fas fa-user"></i>
                                                Utilisateur
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors">
                                                <i className="fas fa-shopping-cart"></i>
                                            </button>
                                            {currentUser?.estAdmin && (
                                                <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Affichage {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredUsers.length)} sur{' '}
                            {filteredUsers.length} résultats
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} sur {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Utilisateurs;

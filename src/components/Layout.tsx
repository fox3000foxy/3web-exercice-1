import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utilisateur } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: Utilisateur | null;
  setCurrentUser: (user: Utilisateur) => void;
  users: Utilisateur[];
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, setCurrentUser, users }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'chart-line' },
    { name: 'Carte de Fidélité', href: '/carte-fidelite', icon: 'credit-card' },
    { name: 'Utilisateurs', href: '/utilisateurs', icon: 'users' },
    { name: 'Produits', href: '/produits', icon: 'box' },
    { name: 'Commandes', href: '/commandes', icon: 'shopping-cart' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar supérieure */}
      <nav className='bg-white border-b border-gray-200 fixed w-full z-50 shadow-sm'>
        <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            {/* Logo et titre */}
            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md'>
                  <i className='fas fa-store text-white text-lg'></i>
                </div>
                <div>
                  <h1 className='text-xl font-bold text-gray-900'>BDE SUPINFO</h1>
                  <p className='text-xs text-gray-500'>Campus Caen</p>
                </div>
              </div>

              {/* Navigation desktop */}
              <div className='hidden md:ml-10 md:flex md:space-x-1'>
                {navigation.map(item => (
                  <Link key={item.name} to={item.href} className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive(item.href) ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <i className={`fas fa-${item.icon} text-sm`}></i>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu utilisateur */}
            <div className='flex items-center gap-4'>
              <div className='hidden sm:flex items-center gap-3 text-sm'>
                <span className='text-gray-600'>{currentUser?.nomComplet}</span>
                {currentUser?.estAdmin && (
                  <span className='px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-medium flex items-center gap-1.5'>
                    <i className='fas fa-shield-alt'></i>
                    Admin
                  </span>
                )}
              </div>

              {/* Avatar dropdown */}
              <div className='relative'>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className='flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors'>
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                    {currentUser?.nomComplet
                      .split(' ')
                      .map(n => n[0])
                      .join('') || 'U'}
                  </div>
                  <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {userMenuOpen && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in'>
                    <div className='px-4 py-3 border-b border-gray-100'>
                      <p className='text-sm font-semibold text-gray-900'>Changer d'utilisateur</p>
                    </div>
                    <div className='max-h-80 overflow-y-auto'>
                      {users.map(user => (
                        <button
                          key={user.id}
                          onClick={() => {
                            setCurrentUser(user);
                            setUserMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 ${currentUser?.id === user.id ? 'bg-blue-50' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${user.estAdmin ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                            {user.nomComplet
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>{user.nomComplet}</p>
                            <p className='text-xs text-gray-500 flex items-center gap-2'>
                              <span>{user.promo}</span>
                              {user.estAdmin && (
                                <span className='text-orange-600'>
                                  <i className='fas fa-shield-alt'></i> Admin
                                </span>
                              )}
                            </p>
                          </div>
                          {currentUser?.id === user.id && <i className='fas fa-check text-blue-600'></i>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Menu mobile */}
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className='md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100'>
                <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation mobile */}
        {sidebarOpen && (
          <div className='md:hidden border-t border-gray-200 bg-white'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map(item => (
                <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  <i className={`fas fa-${item.icon}`}></i>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Contenu principal */}
      <main className='pt-16'>
        <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8'>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { DataProvider, useData } from './contexts/DataContext';
import { ToastProvider } from './contexts/ToastContext';
import CarteFidelite from './pages/CarteFidelite';
import Commandes from './pages/Commandes';
import Dashboard from './pages/Dashboard';
import Produits from './pages/Produits';
import Utilisateurs from './pages/Utilisateurs';

import React from 'react';
React;

const AppContent = () => {
  const { data, currentUser, loading, error, setCurrentUser } = useData();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'>
        <div className='text-center'>
          <div className='relative'>
            <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white mx-auto'></div>
            <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
              <div className='h-12 w-12 rounded-full bg-white/20 animate-pulse'></div>
            </div>
          </div>
          <div className='mt-8 space-y-2'>
            <p className='text-2xl text-white font-bold animate-pulse'>BDE SUPINFO</p>
            <p className='text-lg text-white/80 font-medium'>Chargement en cours...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-red-600 via-pink-600 to-purple-600'>
        <div className='bg-white/95 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md animate-fade-in-scale'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>❌</div>
            <h1 className='text-3xl font-bold text-red-600 mb-3'>Erreur</h1>
            <p className='text-gray-700 text-lg'>{error || 'Impossible de charger les données.'}</p>
            <button onClick={() => window.location.reload()} className='mt-6 btn-primary'>
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} users={data.utilisateurs}>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard data={data} />} />
          <Route path='/carte-fidelite' element={<CarteFidelite data={data} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path='/utilisateurs' element={<Utilisateurs data={data} currentUser={currentUser} />} />
          <Route path='/produits' element={<Produits />} />
          <Route path='/commandes' element={<Commandes data={data} currentUser={currentUser} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <ToastProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ToastProvider>
  );
}

export default App;

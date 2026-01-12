import React, { useState } from 'react';
import { DataType, Produit, Utilisateur } from '../types';

interface CarteFideliteProps {
  data: DataType;
  currentUser: Utilisateur | null;
  setCurrentUser: (user: Utilisateur) => void;
}

const CarteFidelite: React.FC<CarteFideliteProps> = ({ data, currentUser, setCurrentUser }) => {
  const [selectedProduct, setSelectedProduct] = useState<Produit | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const { carteFidelite, produits } = data;
  const userPoints = currentUser?.points || 0;
  const nombreTampons = carteFidelite.nombreTampons;

  const handleStampClick = (index: number) => {
    if (!currentUser) return;

    if (index <= userPoints) {
      // Retirer un tampon
      const updatedUser = { ...currentUser, points: currentUser.points - 1 };
      setCurrentUser(updatedUser);
    } else if (index === userPoints + 1) {
      // Ajouter un tampon
      const updatedUser = { ...currentUser, points: currentUser.points + 1 };
      setCurrentUser(updatedUser);

      // Si on atteint 8 tampons, afficher la récompense
      if (updatedUser.points === nombreTampons) {
        setShowRewardModal(true);
      }
    }
  };

  const handleClaimReward = () => {
    if (!currentUser) return;

    // Réinitialiser les points
    const updatedUser = { ...currentUser, points: 0 };
    setCurrentUser(updatedUser);
    setShowRewardModal(false);
  };

  const activeProduits = produits.filter(p => p.actif);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
          <i className='fas fa-credit-card text-blue-600'></i>
          Carte de Fidélité
        </h1>
        <p className='text-gray-600 mt-1'>Collectez {nombreTampons} tampons pour obtenir une récompense !</p>
      </div>

      {/* Carte de Fidélité */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Vos Tampons</h2>
            <p className='text-gray-600 mt-1'>
              {userPoints} / {nombreTampons} tampons collectés
            </p>
          </div>
          <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md'>
            <i className='fas fa-gift text-white text-2xl'></i>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div className='bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500' style={{ width: `${(userPoints / nombreTampons) * 100}%` }} />
          </div>
          <p className='text-sm text-gray-500 mt-2'>{userPoints === nombreTampons ? 'Carte complète ! 🎉' : `Plus que ${nombreTampons - userPoints} tampons`}</p>
        </div>

        {/* Grille de Tampons */}
        <div className='grid grid-cols-4 gap-4 mb-6'>
          {Array.from({ length: nombreTampons }).map((_, index) => (
            <button key={index} onClick={() => handleStampClick(index + 1)} className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-105 border-2 ${index < userPoints ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md border-purple-600' : 'bg-white text-gray-400 hover:bg-gray-50 border-gray-300 border-dashed'}`}>
              <i className={`fas ${index < userPoints ? 'fa-check-circle' : 'fa-circle'} text-4xl`}></i>
              <span className='mt-2 font-bold text-sm'>#{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Récompense Info */}
        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-orange-200'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md'>
              <i className='fas fa-gift text-white text-xl'></i>
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>Récompense</h3>
              <p className='text-gray-700'>{carteFidelite.recompense}</p>
              {userPoints === nombreTampons && (
                <button onClick={() => setShowRewardModal(true)} className='mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md'>
                  <i className='fas fa-gift mr-2'></i>
                  Réclamer ma récompense
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Boutique de Snacks */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md'>
            <i className='fas fa-shopping-bag text-white text-lg'></i>
          </div>
          <h2 className='text-xl font-bold text-gray-900'>Boutique de Snacks</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {activeProduits.map(produit => (
            <div key={produit.id} className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group'>
              <div className='flex items-start justify-between mb-3'>
                <h3 className='font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors'>{produit.nom}</h3>
                <span className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm'>{produit.prix.toFixed(2)} €</span>
              </div>
              <button onClick={() => setSelectedProduct(produit)} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm'>
                <i className='fas fa-shopping-cart mr-2'></i>
                Commander
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Récompense */}
      {showRewardModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in'>
          <div className='bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-slide-in'>
            <button onClick={() => setShowRewardModal(false)} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors'>
              <i className='fas fa-times text-xl'></i>
            </button>

            <div className='text-center'>
              <div className='inline-block bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full mb-4 shadow-lg'>
                <i className='fas fa-gift text-white text-5xl'></i>
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>Félicitations !</h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>Vous avez collecté tous les tampons ! Vous pouvez maintenant choisir un produit gratuit dans notre boutique.</p>
              <button onClick={handleClaimReward} className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg'>
                <i className='fas fa-gift mr-2'></i>
                Choisir mon cadeau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Commande Produit */}
      {selectedProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in'>
          <div className='bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-slide-in'>
            <button onClick={() => setSelectedProduct(null)} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors'>
              <i className='fas fa-times text-xl'></i>
            </button>

            <div className='text-center'>
              <div className='inline-block bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full mb-4 shadow-lg'>
                <i className='fas fa-shopping-bag text-white text-5xl'></i>
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Commander</h2>
              <p className='text-xl font-semibold text-gray-700 mb-1'>{selectedProduct.nom}</p>
              <p className='text-3xl font-bold text-blue-600 mb-6'>{selectedProduct.prix.toFixed(2)} €</p>

              <div className='space-y-3'>
                <button
                  onClick={() => {
                    alert(`Commande confirmée : ${selectedProduct.nom}`);
                    setSelectedProduct(null);
                  }}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md'>
                  <i className='fas fa-check mr-2'></i>
                  Confirmer la commande
                </button>
                <button onClick={() => setSelectedProduct(null)} className='w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors'>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarteFidelite;

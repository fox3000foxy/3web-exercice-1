import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import RewardCard from '../components/RewardCard';
import StampsGrid from '../components/StampsGrid';
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
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8'>
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
          <p className='text-sm text-gray-500 mt-2'>
            {userPoints === nombreTampons ? (
              <>
                Carte complète ! <i className='fas fa-party-horn text-yellow-500'></i>
              </>
            ) : (
              `Plus que ${nombreTampons - userPoints} tampons`
            )}
          </p>
        </div>

        {/* Grille de Tampons extraite */}
        <StampsGrid userPoints={userPoints} nombreTampons={nombreTampons} onStampClick={handleStampClick} />

        {/* Récompense Info extraite */}
        <RewardCard reward={carteFidelite.recompense} userPoints={userPoints} nombreTampons={nombreTampons} onShowModal={() => setShowRewardModal(true)} />
      </div>

      {/* Boutique de Snacks */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md'>
            <i className='fas fa-shopping-bag text-white text-lg'></i>
          </div>
          <h2 className='text-xl font-bold text-gray-900'>Boutique de Snacks</h2>
        </div>

        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'>
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
      <Modal isOpen={showRewardModal} onClose={() => setShowRewardModal(false)} title='Félicitations !' icon='gift' iconColor='yellow'>
        <p className='text-gray-600 mb-6 leading-relaxed'>Vous avez collecté tous les tampons ! Vous pouvez maintenant choisir un produit gratuit dans notre boutique.</p>
        <Button variant='primary' onClick={handleClaimReward} icon='gift' fullWidth>
          Choisir mon cadeau
        </Button>
      </Modal>

      {/* Modal Commande Produit */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title='Commander' icon='shopping-bag' iconColor='blue'>
        {selectedProduct && (
          <>
            <p className='text-xl font-semibold text-gray-700 mb-1'>{selectedProduct.nom}</p>
            <p className='text-3xl font-bold text-blue-600 mb-6'>{selectedProduct.prix.toFixed(2)} €</p>

            <div className='space-y-3'>
              <Button
                variant='primary'
                onClick={() => {
                  alert(`Commande confirmée : ${selectedProduct.nom}`);
                  setSelectedProduct(null);
                }}
                icon='check'
                fullWidth>
                Confirmer la commande
              </Button>
              <Button variant='secondary' onClick={() => setSelectedProduct(null)} fullWidth>
                Annuler
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CarteFidelite;

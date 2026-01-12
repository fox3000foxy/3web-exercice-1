import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DataType, Produit, Utilisateur } from '../types';

interface DataContextType {
  data: DataType | null;
  currentUser: Utilisateur | null;
  loading: boolean;
  error: string | null;
  setCurrentUser: (user: Utilisateur) => void;
  updateUser: (userId: number, updates: Partial<Utilisateur>) => void;
  updateProduct: (productId: number, updates: Partial<Produit>) => void;
  addProduct: (product: Omit<Produit, 'id'>) => void;
  deleteProduct: (productId: number) => void;
  reloadData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataType | null>(null);
  const [currentUser, setCurrentUser] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    setError(null);

    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then((jsonData: DataType) => {
        setData(jsonData);
        // Définir un utilisateur par défaut (admin pour tester toutes les fonctionnalités)
        setCurrentUser(jsonData.utilisateurs.find(u => u.estAdmin) || jsonData.utilisateurs[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des données:', err);
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateUser = (userId: number, updates: Partial<Utilisateur>) => {
    if (!data) return;

    setData(prevData => {
      if (!prevData) return prevData;

      const updatedUsers = prevData.utilisateurs.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      );

      return {
        ...prevData,
        utilisateurs: updatedUsers,
      };
    });

    // Mettre à jour currentUser si c'est celui modifié
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  const updateProduct = (productId: number, updates: Partial<Produit>) => {
    if (!data) return;

    setData(prevData => {
      if (!prevData) return prevData;

      const updatedProducts = prevData.produits.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      );

      return {
        ...prevData,
        produits: updatedProducts,
      };
    });
  };

  const addProduct = (product: Omit<Produit, 'id'>) => {
    if (!data) return;

    setData(prevData => {
      if (!prevData) return prevData;

      // Trouver le prochain ID disponible
      const maxId = Math.max(...prevData.produits.map(p => p.id), 0);
      const newProduct: Produit = {
        ...product,
        id: maxId + 1,
      };

      return {
        ...prevData,
        produits: [...prevData.produits, newProduct],
      };
    });
  };

  const deleteProduct = (productId: number) => {
    if (!data) return;

    setData(prevData => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        produits: prevData.produits.filter(p => p.id !== productId),
      };
    });
  };

  const reloadData = () => {
    loadData();
  };

  const value: DataContextType = {
    data,
    currentUser,
    loading,
    error,
    setCurrentUser,
    updateUser,
    updateProduct,
    addProduct,
    deleteProduct,
    reloadData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

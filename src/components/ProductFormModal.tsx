import React, { useEffect, useState } from 'react';
import { Button, FormField, Modal } from '../components';
import { Produit } from '../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Produit, 'id'>) => void;
  product?: Produit | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    actif: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setFormData({
        nom: product.nom,
        prix: product.prix.toString(),
        actif: product.actif,
      });
    } else {
      setFormData({
        nom: '',
        prix: '',
        actif: true,
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom du produit est requis';
    }

    if (!formData.prix || parseFloat(formData.prix) <= 0) {
      newErrors.prix = 'Le prix doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      nom: formData.nom.trim(),
      prix: parseFloat(formData.prix),
      actif: formData.actif,
    });

    onClose();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Modifier le produit' : 'Ajouter un produit'}
      icon="box"
      iconColor={product ? 'orange' : 'green'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Nom du produit"
          name="nom"
          type="text"
          value={formData.nom}
          onChange={(value) => handleChange('nom', value as string)}
          placeholder="Ex: Coca Cola"
          required
          error={errors.nom}
          icon="tag"
        />

        <FormField
          label="Prix (€)"
          name="prix"
          type="number"
          value={formData.prix}
          onChange={(value) => handleChange('prix', value.toString())}
          placeholder="0.00"
          required
          error={errors.prix}
          icon="euro-sign"
        />

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="actif"
            checked={formData.actif}
            onChange={(e) => handleChange('actif', e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="actif" className="text-sm font-medium text-gray-700 cursor-pointer">
            Produit actif (disponible à la vente)
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            <i className="fas fa-times mr-2"></i>
            Annuler
          </Button>
          <Button type="submit" variant={product ? 'primary' : 'success'} fullWidth>
            <i className={`fas ${product ? 'fa-save' : 'fa-plus'} mr-2`}></i>
            {product ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;

import React from 'react';
import { Button, Modal } from '../components';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'élément',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Supprimer ${itemType}`}
      icon="exclamation-triangle"
      iconColor="red"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Êtes-vous sûr de vouloir supprimer <strong className="text-gray-900">{itemName}</strong> ?
        </p>
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          <i className="fas fa-exclamation-circle mr-2"></i>
          Cette action est irréversible.
        </p>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            <i className="fas fa-times mr-2"></i>
            Annuler
          </Button>
          <Button type="button" variant="danger" onClick={handleConfirm} fullWidth>
            <i className="fas fa-trash mr-2"></i>
            Supprimer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

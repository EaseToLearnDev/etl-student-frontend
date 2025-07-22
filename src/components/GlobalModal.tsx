import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useModalStore } from '../store/useModalStore';
import { Modal } from './Modal';

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size } = useModalStore();
  const location = useLocation();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      size={size}
    >
      {view}
    </Modal>
  );
}

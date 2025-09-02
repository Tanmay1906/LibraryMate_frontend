
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  showClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    modalRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={`bg-white/90 rounded-2xl shadow-2xl p-8 min-w-[300px] max-w-lg w-full relative ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-900 hover:text-red-500 text-xl font-bold focus:outline-none"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
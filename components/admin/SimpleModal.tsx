"use client";

import React from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '800px',
    maxHeight: '90vh',
    width: '100%',
    padding: 0,
    border: '2px solid rgba(194, 47, 99, 0.2)',
    borderRadius: '0.75rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'auto',
    zIndex: 100
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99
  }
};

interface SimpleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SimpleModal({ isOpen, onRequestClose, title, description, children }: SimpleModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={title}
    >
      <div className="bg-white rounded-xl">
        <div className="sticky top-0 bg-[#c22f63] text-white p-6 rounded-t-lg z-[101]">
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-white/80 mt-3">{description}</p>}
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </Modal>
  );
} 
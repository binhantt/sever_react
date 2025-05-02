// Có thể tạo component base chung nếu cần
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BaseModal = ({ 
  show, 
  handleClose, 
  title,
  children,
  submitText = 'Lưu',
  onSubmit
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          form="order-form"
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BaseModal;
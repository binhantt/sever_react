import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserManagementModal = ({ showModal, handleClose, editingUser, newUser, setNewUser, handleSubmit }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              className="shadow-sm"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              className="shadow-sm"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit">
            {editingUser ? 'Lưu thay đổi' : 'Thêm'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserManagementModal;
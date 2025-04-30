import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
import defaultUsers from '../../config/data/UserConfig';

const UserManagement = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleShowAdd = () => {
    setShowModal(true);
    setCurrentUser(null);
  };

  const handleShowEdit = (user) => {
    setShowModal(true);
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setToastMessage('Xóa người dùng thành công!');
    setShowToast(true);
  };

  const handleSubmit = (formData) => {
    if (currentUser) {
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...user, ...formData } : user
      ));
      setToastMessage('Cập nhật người dùng thành công!');
    } else {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newId, ...formData }]);
      setToastMessage('Thêm người dùng thành công!');
    }
    handleClose();
    setShowToast(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quản lý người dùng</h3>
      
      </div>
      
      <UserManagementTable 
        users={users} 
        handleShowEdit={handleShowEdit} 
        handleDelete={handleDelete} 
      />
      
      <UserManagementModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        user={currentUser}
        isEditing={!!currentUser}
      />
      
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default UserManagement;
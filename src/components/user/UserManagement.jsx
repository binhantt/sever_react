import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
import defaultUsers from '../../config/data/UserConfig';

const UserManagement = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setNewUser({ name: '', email: '' });
  };

  const handleShowAdd = () => {
    setShowModal(true);
    setEditingUser(null);
    setNewUser({ name: '', email: '' });
  };

  const handleShowEdit = (user) => {
    setShowModal(true);
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setToastMessage('Xóa người dùng thành công!');
    setShowToast(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...newUser } : user
      ));
      setToastMessage('Sửa người dùng thành công!');
    } else {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newId, ...newUser }]);
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
        showModal={showModal}
        handleClose={handleClose}
        editingUser={editingUser}
        newUser={newUser}
        setNewUser={setNewUser}
        handleSubmit={handleSubmit}
      />
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        className="position-fixed top-0 end-0 m-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <style>{`
        .hover-scale {
          transition: transform 0.2s;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        table {
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
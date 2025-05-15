import React, { useEffect, useState, useCallback } from 'react';
import { Button, Toast, Badge } from 'react-bootstrap';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  updateUser,
  deleteUser,
  createUser
} from '../../store/Api/User.Api';
import {
  setCurrentUser,
  clearErrors
} from '../../store/Slice/User.Slice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, currentUser, loading, error } = useSelector(state => state.user);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  // Memoize loadUsers function to prevent unnecessary re-renders
  const loadUsers = useCallback(async () => {
    try {
      const result = await dispatch(fetchUsers({
        page: pagination.page,
        limit: pagination.limit
      })).unwrap();
      
      setPagination(prev => ({
        ...prev,
        total: result.totalCount || 0
      }));
    } catch (error) {
      showToastMessage(
        'Không thể tải danh sách người dùng. Vui lòng thử lại.',
        'danger'
      );
    }
  }, [dispatch, pagination.page, pagination.limit]);

  // Auto refresh data every 30 seconds
  useEffect(() => {
    loadUsers(); // Initial load

    const autoRefreshInterval = setInterval(() => {
      loadUsers();
    }, 30000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(autoRefreshInterval);
  }, [loadUsers]);

  // Load users when pagination changes
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Refresh data after any update operation
  const refreshData = useCallback(() => {
    loadUsers();
  }, [loadUsers]);

  const showToastMessage = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handlePageChange = (newPage, newLimit) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
      limit: newLimit
    }));
  };

  const handleClose = () => {
    setShowModal(false);
    dispatch(setCurrentUser(null));
    dispatch(clearErrors());
  };

  const handleShowAdd = () => {
    dispatch(setCurrentUser(null));
    setShowModal(true);
  };

  const handleShowEdit = (user) => {
    dispatch(setCurrentUser(user));
    setShowModal(true);
  };

  const handleToggleActive = async (user) => {
    try {
      await dispatch(updateUser({
        id: user.id,
        userData: {
          ...user,
          is_active: user.is_active === 1 ? 0 : 1
        }
      })).unwrap();
      
      showToastMessage(
        `Tài khoản đã được ${user.is_active === 1 ? 'khóa' : 'kích hoạt'} thành công!`
      );
      refreshData(); // Refresh after toggle
    } catch (error) {
      showToastMessage(
        'Không thể thay đổi trạng thái tài khoản. Vui lòng thử lại.',
        'danger'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      showToastMessage('Xóa người dùng thành công!');
      refreshData(); // Refresh after delete
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || 'Không thể xóa người dùng. Vui lòng thử lại.',
        'danger'
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentUser && currentUser.id) { // Add null check
        const result = await dispatch(updateUser({ 
          id: currentUser.id, 
          userData: formData
        })).unwrap();
        showToastMessage('Cập nhật người dùng thành công!');
        handleClose();
        refreshData();
      } else if (!currentUser) {
        // Handle create user case
        await dispatch(createUser({
          ...formData,
          is_active: formData.is_active
        })).unwrap();
        showToastMessage('Thêm người dùng thành công!');
        handleClose();
        refreshData();
      }
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.message || 
        error.response?.data?.message || 
        'Có lỗi xảy ra khi cập nhật';
      showToastMessage(errorMessage, 'danger');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quản lý người dùng</h3>
        <Button variant="primary" onClick={handleShowAdd}>
          Thêm người dùng
        </Button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <UserManagementTable
        users={users}
        handleShowEdit={handleShowEdit}
        handleDelete={handleDelete}
        handleToggleActive={handleToggleActive}
        pagination={pagination}
        setPagination={handlePageChange}
        currentUser={currentUser}
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
        bg={toastVariant}
        text={toastVariant === 'success'? 'light' : 'dark'}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default UserManagement;
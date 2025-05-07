import React, { useEffect, useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  updateUser,
  deleteUser
} from '../../store/Api/User.Api';
import {
  setCurrentUser,
  clearErrors
} from '../../store/Slice/User.Slice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const {
    users,
    currentUser,

  } = useSelector(state => state.user);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    dispatch(fetchUsers({
      page: pagination.page,
      limit: pagination.limit
    })).then((action) => {
      if (action.payload) {
        setPagination(prev => ({
          ...prev,
          total: action.payload.totalCount || 0
        }));
      }
    });
  }, [dispatch, pagination.page, pagination.limit]);

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
    setShowModal(true);
    dispatch(setCurrentUser(null));
  };
  const handleShowEdit = (user) => { // Đổi từ users thành user
    setShowModal(true);
    dispatch(setCurrentUser(user));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .then(() => {
        setToastMessage('Xóa người dùng thành công!');
        setShowToast(true);
      });
  };

  const handleSubmit = (formData) => {
    console.log('Dữ liệu người dùng trước khi cập nhật:', currentUser);
    console.log('Dữ liệu mới sẽ được cập nhật:', formData);

    if (currentUser) {
      dispatch(updateUser({ id: currentUser.id, userData: formData }))
        .then((result) => {
          console.log('Kết quả sau khi cập nhật:', result);
          setToastMessage('Cập nhật người dùng thành công!');
          setShowToast(true);
          handleClose();
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật:', error);
        });
    } else {
      dispatch(createUser(formData))
        .then(() => {
          setToastMessage('Thêm người dùng thành công!');
          setShowToast(true);
          handleClose();
        });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quản lý người dùng</h3>
        <Button variant="primary" onClick={handleShowAdd}>
          Thêm người dùng
        </Button>
      </div>

      <UserManagementTable
        users={users}
        handleShowEdit={handleShowEdit} // Sửa từ handleShowEdit(users) thành handleShowEdit
        handleDelete={handleDelete}
        pagination={pagination}
        setPagination={handlePageChange}
        currentUser={currentUser} // Thêm dòng này
      />

      <UserManagementModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}

        user={currentUser} // Truyền dữ liệu user từ Redux store
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
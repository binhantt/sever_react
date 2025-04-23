import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserCircle, FaSort, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserManagementTable = ({ users, handleShowEdit, handleDelete }) => {
  return (
    <Table striped bordered hover responsive className="rounded shadow-sm" size="sm">
      <thead className="bg-dark text-white">
        <tr>
          <th className="py-2 px-3 text-center">
            <div className="d-flex align-items-center justify-content-center">
              <span>ID</span>
              <FaSort className="ms-1" size={12} />
            </div>
          </th>
          <th className="py-2 px-3">
            <div className="d-flex align-items-center">
              <span>Thông tin</span>
              <FaSort className="ms-1" size={12} />
            </div>
          </th>
          <th className="py-2 px-3">
            <div className="d-flex align-items-center">
              <span>Email</span>
              <FaSort className="ms-1" size={12} />
            </div>
          </th>
          <th className="py-2 px-3">
            <div className="d-flex align-items-center justify-content-center">
              <span className="small">Trạng thái</span>
              <FaSort className="ms-1" size={10} />
            </div>
          </th>
          <th className="py-2 px-3">
            <div className="d-flex align-items-center">
              <span className="small text-muted">Chức danh</span>
              <FaSort className="ms-1" size={10} />
            </div>
          </th>
          
          <th className="py-2 px-3 text-center">Hành động</th>
        </tr>

      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="align-middle">
            <td className="py-2 px-3 text-center">
              <Badge bg="secondary" className="small">{user.id}</Badge>
            </td>
            <td className="py-2 px-3">
              <div className="d-flex align-items-center">
                <FaUserCircle className="me-2" size={18} color="#6c757d" />
                <span className="small">{user.name}</span>
              </div>
            </td>
            <td className="py-2 px-3 text-truncate small" style={{ maxWidth: '200px' }}>
              {user.email}
            </td>
            <td className="py-2 px-3 text-center">
              {user.active ? (
                <Badge bg="success" className="d-flex align-items-center justify-content-center small">
                  <FaCheckCircle className="me-1" size={12} />
                  Hoạt động
                </Badge>
              ) : (
                <Badge bg="danger" className="d-flex align-items-center justify-content-center small">
                  <FaTimesCircle className="me-1" size={12} />
                  Khóa
                </Badge>
              )}
            </td>
            <td className="py-2 px-3 text-center">
              <Badge bg={user.role === 'admin' ? 'dark' : 'secondary'} className="small">
                {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}
              </Badge>
            </td>
          
            <td className="py-2 px-3 text-center">
              <Button 
                variant="outline-warning" 
                size="sm"
                className="me-1"
                onClick={() => handleShowEdit(user)}
              >
                <FaEdit size={14} />
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => handleDelete(user.id)}
              >
                <FaTrash size={14} />
              </Button>
            </td>
          
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserManagementTable;
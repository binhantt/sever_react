import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ManufacturersList({ 
  data = {data: []}, 
  loading, 
  error, 
  onEdit = () => console.log('Edit clicked'), // Add default function
  onDelete = () => console.log('Delete clicked') // Add default function
}) {
  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;
  if (!data?.data || data.data.length === 0) {
    return <div className="alert alert-info">Không có dữ liệu của nhà sản xuất</div>;
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="mb-0">
        <thead className="bg-light">
          <tr>
            <th className="text-center">ID</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
              <td className="text-center">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onEdit(item)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

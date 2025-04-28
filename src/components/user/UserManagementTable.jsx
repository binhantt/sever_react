
import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Stack,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Pagination,
} from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaSort,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaUserPlus,
  FaEllipsisH,
} from 'react-icons/fa';

const UserManagementTable = ({ users, handleShowEdit, handleDelete, handleAddUser }) => {
  // State for search, pagination, per page
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter users by name, email, id
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toString().includes(searchTerm)
  );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'id') {
      comparison = a.id - b.id;
    } else if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'email') {
      comparison = a.email.localeCompare(b.email);
    } else if (sortField === 'active') {
      comparison = (a.active === b.active) ? 0 : a.active ? -1 : 1;
    } else if (sortField === 'role') {
      comparison = a.role.localeCompare(b.role);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination logic
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedUsers.length / perPage);

  // Pagination items with ellipsis
  const getPaginationItems = () => {
    let items = [];
    let pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(number =>
        number === 1 ||
        number === totalPages ||
        (number >= currentPage - 1 && number <= currentPage + 1)
      );
    pageNumbers.forEach((number, idx, arr) => {
      if (idx > 0 && arr[idx - 1] !== number - 1) {
        items.push(
          <Pagination.Ellipsis key={`ellipsis-${number}`} disabled />
        );
      }
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    });
    return items;
  };

  // Sort indicator component
  const SortIndicator = ({ field }) => (
    <span className="ms-1">
      {sortField === field ? (
        <FaSort 
          size={12} 
          className={sortDirection === 'asc' ? 'text-primary' : 'text-primary'} 
          style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
        />
      ) : (
        <FaSort size={10} className="text-muted" />
      )}
    </span>
  );

  return (
    <Container fluid className="p-0">
      <Card className="mb-0 shadow-sm border-0 overflow-hidden">
        <Card.Header className="bg-gradient bg-primary text-white py-3">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaUserCircle className="me-2" size={24} />
                Quản lý người dùng
              </h5>
            </Col>
            <Col xs="auto">
              <Button 
                variant="light" 
                size="sm" 
                className="d-flex align-items-center shadow-sm"
                onClick={handleAddUser}
              >
                <FaUserPlus className="me-2" />
                Thêm người dùng
              </Button>
            </Col>
          </Row>
        </Card.Header>
        
        <div className="bg-light border-bottom py-3 px-3">
          <Row className="align-items-center g-3">
            <Col md={6} lg={4}>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, email, ID..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border-start-0 ps-0"
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="text-md-end">
              <Stack direction="horizontal" gap={3} className="justify-content-md-end">
                <div className="d-flex align-items-center">
                  <FaFilter className="text-primary me-2" />
                  <Form.Select
                    style={{ width: 'auto' }}
                    value={perPage}
                    onChange={e => {
                      setPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    aria-label="Số dòng/trang"
                    className="shadow-sm"
                  >
                    <option value={5}>5 dòng/trang</option>
                    <option value={10}>10 dòng/trang</option>
                    <option value={20}>20 dòng/trang</option>
                    <option value={50}>50 dòng/trang</option>
                  </Form.Select>
                </div>
              </Stack>
            </Col>
          </Row>
        </div>
        
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle table-striped">
              <thead>
                <tr className="bg-light">
                  <th className="text-center py-3" style={{ width: 70 }}>
                    <div 
                      className="d-flex align-items-center justify-content-center user-select-none"
                      onClick={() => handleSort('id')}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="small fw-bold">ID</span>
                      <SortIndicator field="id" />
                    </div>
                  </th>
                  <th className="py-3" style={{ width: '25%' }}>
                    <div 
                      className="d-flex align-items-center user-select-none"
                      onClick={() => handleSort('name')}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="small fw-bold">Thông tin</span>
                      <SortIndicator field="name" />
                    </div>
                  </th>
                  <th className="py-3" style={{ width: '30%' }}>
                    <div 
                      className="d-flex align-items-center user-select-none"
                      onClick={() => handleSort('email')}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="small fw-bold">Email</span>
                      <SortIndicator field="email" />
                    </div>
                  </th>
                  <th className="text-center py-3" style={{ width: '15%' }}>
                    <div 
                      className="d-flex align-items-center justify-content-center user-select-none"
                      onClick={() => handleSort('active')}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="small fw-bold">Trạng thái</span>
                      <SortIndicator field="active" />
                    </div>
                  </th>
                  <th className="text-center py-3" style={{ width: '15%' }}>
                    <div 
                      className="d-flex align-items-center justify-content-center user-select-none"
                      onClick={() => handleSort('role')}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="small fw-bold">Chức danh</span>
                      <SortIndicator field="role" />
                    </div>
                  </th>
                  <th className="text-center py-3" style={{ width: 100 }}>
                    <span className="small fw-bold">Hành động</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <div className="d-flex flex-column align-items-center text-muted">
                        <FaUserCircle size={40} className="mb-3 opacity-50" />
                        <p className="mb-0">Không có người dùng nào.</p>
                        <p className="small">Vui lòng thử tìm kiếm khác hoặc thêm người dùng mới.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map(user => (
                    <tr key={user.id} className="align-middle">
                      <td className="text-center">
                        <Badge
                          bg="secondary"
                          className="fw-bold"
                          style={{
                            fontSize: '0.85em',
                            padding: '0.5em 0.8em',
                            letterSpacing: '0.5px',
                          }}
                        >
                          #{user.id}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-2">
                            <FaUserCircle size={22} className="text-primary" />
                          </div>
                          <div>
                            <div className="fw-semibold">{user.name}</div>
                            {user.phone && (
                              <div className="small text-muted">{user.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: 250 }}>
                          <span className="text-muted">{user.email}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        {user.active ? (
                          <Badge
                            bg="success"
                            className="d-inline-flex align-items-center gap-1 px-2 py-1"
                            style={{ fontSize: '0.85em' }}
                          >
                            <FaCheckCircle size={12} />
                            <span>Hoạt động</span>
                          </Badge>
                        ) : (
                          <Badge
                            bg="danger"
                            className="d-inline-flex align-items-center gap-1 px-2 py-1"
                            style={{ fontSize: '0.85em' }}
                          >
                            <FaTimesCircle size={12} />
                            <span>Khóa</span>
                          </Badge>
                        )}
                      </td>
                      <td className="text-center">
                        <Badge
                          bg={user.role === 'admin' ? 'dark' : 'info'}
                          className="px-2 py-1"
                          style={{ fontSize: '0.85em' }}
                        >
                          {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Chỉnh sửa</Tooltip>}
                          >
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="d-flex align-items-center justify-content-center p-1"
                              style={{ width: '32px', height: '32px' }}
                              onClick={() => handleShowEdit(user)}
                            >
                              <FaEdit size={14} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Xóa</Tooltip>}
                          >
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="d-flex align-items-center justify-content-center p-1"
                              style={{ width: '32px', height: '32px' }}
                              onClick={() => handleDelete(user.id)}
                            >
                              <FaTrash size={14} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        
        <Card.Footer className="bg-white py-3 px-3">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <div className="text-muted small">
                {filteredUsers.length > 0 ? (
                  <>Hiển thị <span className="fw-semibold">{indexOfFirst + 1}</span> đến <span className="fw-semibold">{Math.min(indexOfLast, filteredUsers.length)}</span> trong tổng số <span className="fw-semibold">{filteredUsers.length}</span> người dùng</>
                ) : (
                  <>Không có người dùng nào</>
                )}
              </div>
            </Col>
            <Col xs={12} md={6}>
              {totalPages > 0 && (
                <Pagination className="mb-0 justify-content-md-end justify-content-center pagination-sm">
                  <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {getPaginationItems()}
                  <Pagination.Next
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  />
                  <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  />
                </Pagination>
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default UserManagementTable;

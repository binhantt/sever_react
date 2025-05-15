import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
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


const UserManagementTable = ({ 
  users = [], 
  handleShowEdit = () => {}, // Thêm giá trị mặc định
  handleDelete = ()=>{}, // Thêm giá trị mặc định 
  handleAddUser,
  pagination,
  setPagination,

  currentUser = null 
}) => {
  // Convert users to array if it's an object
  const usersArray = useMemo(() => Array.isArray(users) ? users : [users], [users]);
  
  // State for search, pagination, per page
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Reset pagination when users data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  // Memoize filtered users
  const filteredUsers = useMemo(() => 
    usersArray.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id?.toString().includes(searchTerm)
    ), [usersArray, searchTerm]);

  // Memoize sorted users
  const sortedUsers = useMemo(() => 
    [...filteredUsers].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'id') {
        comparison = a.id - b.id;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === 'active') {
        comparison = (a.is_active === b.is_active) ? 0 : a.is_active > b.is_active ? -1 : 1;
      } else if (sortField === 'role') {
        comparison = a.role.localeCompare(b.role);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    }), [filteredUsers, sortField, sortDirection]);

  // Memoize pagination calculations
  const { currentUsers, totalPages, indexOfFirst, indexOfLast } = useMemo(() => {
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    return {
      currentUsers: sortedUsers.slice(indexOfFirst, indexOfLast),
      totalPages: Math.ceil(sortedUsers.length / perPage),
      indexOfFirst,
      indexOfLast
    };
  }, [sortedUsers, currentPage, perPage]);

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
       
        
        <div className="bg-light border-bottom py-3 px-3">
          <Row className="align-items-center g-3">
            <Col md={6} lg={4}>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, email, ID.."
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
        
        <Card.Body className="p-4">
          <div className="table-responsive">
        
            <Table className="table-hover" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th className="border-0 text-muted" style={{ fontSize: '0.95rem', width: 70 }}>ID</th>
                  <th className="border-0 text-muted" style={{ fontSize: '0.95rem', width: '25%' }}>Thông tin</th>
                  <th className="border-0 text-muted" style={{ fontSize: '0.95rem', width: '20%' }}>Email</th>
                  <th className="border-0 text-muted text-center" style={{ fontSize: '0.95rem', width: '15%' }}>Vai trò</th>
                  <th className="border-0 text-muted text-center" style={{ fontSize: '0.95rem', width: '15%' }}>Trạng thái</th>
                  <th className="border-0 text-muted text-center" style={{ fontSize: '0.95rem', width: 100 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border-0 fw-medium">#{user.id}</td>
                    <td className="border-0">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded-circle p-2 me-2">
                          <FaUserCircle size={22} className="text-primary" />
                        </div>
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <div className="small text-muted">{user.phone || 'Chưa cập nhật'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-0">
                      <span className="text-muted">{user.email}</span>
                    </td>
                    <td className="border-0 text-center">
                      <Badge 
                        bg={user.role === 'admin' ? 'primary' : user.role === 'part_time' ? 'info' : 'secondary'} 
                        className="fw-normal"
                      >
                        {user.role === 'admin' ? 'Quản trị' : user.role === 'part_time' ? 'Nhân viên' : 'Người dùng'}
                      </Badge>
                    </td>
                    <td className="border-0 text-center">
                      {user.is_active === 1 ? (
                        <Badge bg="success" className="fw-normal">Hoạt động</Badge>
                      ) : (
                        <Badge bg="danger" className="fw-normal">Khóa</Badge>
                      )}
                    </td>
                    <td className="border-0 text-center">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleShowEdit(user)}
                        disabled={user.role === 'admin' && currentUser?.role !== 'admin'}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === 'admin' && currentUser?.role !== 'admin'}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        <Card.Footer className="bg-white border-0 px-4 py-2">
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                {filteredUsers.length > 0 ? (
                  <>
                    Hiển thị <span className="fw-semibold" style={{ color: '#222' }}>{indexOfFirst + 1}</span>
                    &nbsp;-&nbsp;
                    <span className="fw-semibold" style={{ color: '#222' }}>{Math.min(indexOfLast, filteredUsers.length)}</span>
                    &nbsp;trong&nbsp;
                    <span className="fw-semibold" style={{ color: '#222' }}>{filteredUsers.length}</span> người dùng
                  </>
                ) : (
                  <>Không có người dùng nào</>
                )}
              </div>
            </Col>
            <Col xs={12} md={6}>
              {totalPages > 0 && (
                <div className="d-flex justify-content-md-end justify-content-start mt-2 mt-md-0">
                  <Pagination className="mb-0 pagination-sm" style={{ background: 'transparent', borderRadius: 6, padding: 0 }}>
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
                </div>
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};
export default React.memo(UserManagementTable);
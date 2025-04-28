
import React from 'react';
import {
  Card,
  Table,
  Button,
  Badge,
  Stack,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaSort,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const UserManagementTable = ({ users, handleShowEdit, handleDelete }) => {
  return (
    <Container fluid className="p-0">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white py-3">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0 fw-bold">Quản lý người dùng</h5>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-center" style={{ width: 60 }}>
                  <Stack direction="horizontal" gap={1} className="justify-content-center">
                    <span className="small fw-semibold">ID</span>
                    <FaSort size={10} className="text-muted" />
                  </Stack>
                </th>
                <th>
                  <Stack direction="horizontal" gap={1}>
                    <span className="small fw-semibold">Thông tin</span>
                    <FaSort size={10} className="text-muted" />
                  </Stack>
                </th>
                <th>
                  <Stack direction="horizontal" gap={1}>
                    <span className="small fw-semibold">Email</span>
                    <FaSort size={10} className="text-muted" />
                  </Stack>
                </th>
                <th className="text-center">
                  <Stack direction="horizontal" gap={1} className="justify-content-center">
                    <span className="small fw-semibold">Trạng thái</span>
                    <FaSort size={10} className="text-muted" />
                  </Stack>
                </th>
                <th className="text-center">
                  <Stack direction="horizontal" gap={1} className="justify-content-center">
                    <span className="small fw-semibold">Chức danh</span>
                    <FaSort size={10} className="text-muted" />
                  </Stack>
                </th>
                <th className="text-center">
                  <span className="small fw-semibold">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    Không có người dùng nào.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="align-middle">
                    <td className="text-center">
                      <Badge
                        bg="secondary"
                        className="fw-bold"
                        style={{
                          fontSize: '0.95em',
                          padding: '0.5em 0.8em',
                          letterSpacing: '0.5px',
                        }}
                      >
                        #{user.id}
                      </Badge>
                    </td>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        <FaUserCircle size={22} color="#6c757d" />
                        <span className="fw-semibold">{user.name}</span>
                      </Stack>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: 180 }}>
                      <span className="text-muted">{user.email}</span>
                    </td>
                    <td className="text-center">
                      {user.active ? (
                        <Badge
                          bg="success"
                          className="d-inline-flex align-items-center gap-1 px-2 py-1"
                          style={{ fontSize: '0.95em' }}
                        >
                          <FaCheckCircle size={13} className="me-1" />
                          Hoạt động
                        </Badge>
                      ) : (
                        <Badge
                          bg="danger"
                          className="d-inline-flex align-items-center gap-1 px-2 py-1"
                          style={{ fontSize: '0.95em' }}
                        >
                          <FaTimesCircle size={13} className="me-1" />
                          Khóa
                        </Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Badge
                        bg={user.role === 'admin' ? 'dark' : 'info'}
                        className="px-2 py-1"
                        style={{ fontSize: '0.95em' }}
                      >
                        {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Stack direction="horizontal" gap={2} className="justify-content-center">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Chỉnh sửa</Tooltip>}
                        >
                          <Button
                            variant="outline-primary"
                            size="sm"
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
                            onClick={() => handleDelete(user.id)}
                          >
                            <FaTrash size={14} />
                          </Button>
                        </OverlayTrigger>
                      </Stack>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserManagementTable;

import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

const ProductIntroTable = ({ products = [], onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="border-0 px-4 py-3" style={{ width: '50px' }}>STT</th>
            <th className="border-0 px-4 py-3" style={{ width: '100px' }}>Hình ảnh</th>
            <th className="border-0 px-4 py-3">Tiêu đề</th>
            <th className="border-0 px-4 py-3">Phụ đề</th>
            <th className="border-0 px-4 py-3" style={{ width: '150px' }}>Nút 1</th>
            <th className="border-0 px-4 py-3" style={{ width: '150px' }}>Nút 2</th>
            <th className="border-0 px-4 py-3 text-end" style={{ width: '120px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-5">
                <div className="text-muted">
                  <i className="fas fa-box fa-3x mb-3"></i>
                  <p className="mb-0">Không có sản phẩm nào.</p>
                  <small>Hãy thêm sản phẩm mới để bắt đầu.</small>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id || index}>
                <td className="px-4 text-muted">{index + 1}</td>
                <td className="px-4">
                  <div 
                    className="rounded"
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundImage: `url(${product.image_url || '/placeholder.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '1px solid #dee2e6'
                    }}
                  />
                </td>
                <td className="px-4">
                  <h6 className="mb-1">{product.title || 'N/A'}</h6>
                  {product.id && (
                    <small className="text-muted">ID: {product.id}</small>
                  )}
                </td>
                <td className="px-4">
                  <p className="text-muted mb-0" style={{ 
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {product.subtitle || 'N/A'}
                  </p>
                </td>
                <td className="px-4">
                  {product.button1_text ? (
                    <div className="d-flex align-items-center">
                      <Badge 
                        bg="primary" 
                        className="me-2 text-truncate"
                        style={{ maxWidth: '100px' }}
                      >
                        {product.button1_text}
                      </Badge>
                      {product.button1_link && (
                        <a 
                          href={product.button1_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
                <td className="px-4">
                  {product.button2_text ? (
                    <div className="d-flex align-items-center">
                      <Badge 
                        bg="secondary" 
                        className="me-2 text-truncate"
                        style={{ maxWidth: '100px' }}
                      >
                        {product.button2_text}
                      </Badge>
                      {product.button2_link && (
                        <a 
                          href={product.button2_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
                <td className="px-4">
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center justify-content-center p-2"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => onEdit(product)}
                    >
                      <FaEdit className="text-primary" />
                    </Button>
                    <Button 
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center justify-content-center p-2"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => onDelete(product.id)}
                    >
                      <FaTrash className="text-danger" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductIntroTable;
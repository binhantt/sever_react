import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductIntroModal = ({ 
  show, 
  handleClose, 
  product = null,
  isEditing = false 
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa giới thiệu' : 'Thêm giới thiệu mới'}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.title || ''}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Phụ đề</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.subtitle || ''}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control 
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const formData = new FormData();
                formData.append('image', file);
                
                try {
                  const response = await axios.post('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', formData);
                  // Cập nhật URL hình ảnh vào state/form
                } catch (error) {
                  console.error('Upload failed:', error);
                }
              }}
            />
            {product?.image_url && (
              <img 
                src={product.image_url} 
                alt="Preview" 
                style={{ maxWidth: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Nút 1 - Text</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.button1_text || ''}
              placeholder="Nhập text cho nút 1"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Nút 1 - Link</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.button1_link || ''}
              placeholder="Nhập link cho nút 1"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Nút 2 - Text</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.button2_text || ''}
              placeholder="Nhập text cho nút 2"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Nút 2 - Link</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={product?.button2_link || ''}
              placeholder="Nhập link cho nút 2"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductIntroModal;
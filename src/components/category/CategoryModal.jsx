import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ImgBBConfig from '../../config/ImgBB.config';

const CategoryModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  category = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    active: true,
    image: ''
  });

  // Add this missing function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        active: category.active !== false,
        image: category.image || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        active: true,
        image: '',
        image_url: ''
      });
    }
  }, [category]);

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${ImgBBConfig.uploadUrl}?key=${ImgBBConfig.apiKey}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFormData(prev => ({ 
        ...prev, 
        image: response.data.data.url,
        image_url: response.data.data.url 
      }));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image Ảnh</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh danh mục</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  style={{ maxWidth: '100px', marginRight: '10px' }}
                />
              </div>
            )}
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

export default CategoryModal;
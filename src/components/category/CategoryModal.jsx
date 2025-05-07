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

  useEffect(() => {
    // console.log('Category changed:', category);
    if (category) {
      const newData = {
        name: category.name || '',
        description: category.description || '',
        active: category.active !== false,
        image: category.image || '',
      };
      // console.log('Setting form data from category:', newData);
      setFormData(newData);
    } else {
      console.log('Initializing empty form data');
      setFormData({
        name: '',
        description: '',
        active: true,
        image: '',
        image_url: ''
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log('Image selected:', file?.name);
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      console.log('Uploading image to ImgBB');
      const response = await axios.post(
        `${ImgBBConfig.uploadUrl}?key=${ImgBBConfig.apiKey}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Upload successful:', response.data.data.url);
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
        console.log('Submitting form data:', formData);
        handleSubmit(formData);
      }}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              name="name"  // Giữ nguyên cho trường tên
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"  // Đổi từ imageUrl thành image để khớp với state
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
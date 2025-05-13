import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { FaUpload, FaImage, FaLink } from 'react-icons/fa';
import axios from 'axios';
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
    description: '',
    active: true,
    image: '',
    image_url: ''
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        active: category.active !== false,
        image: category.image || '',
        image_url: category.image || ''
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${ImgBBConfig.uploadUrl}?key=${ImgBBConfig.apiKey}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
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
      setUploadProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-primary">
          {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}>
        <Modal.Body className="p-4">
          <div className="row">
            <div className="col-md-7">
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Tên danh mục</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên danh mục"
                  className="border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả danh mục"
                  className="border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium d-flex align-items-center">
                  <FaLink className="me-2" />
                  URL Hình ảnh
                </Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Nhập URL hình ảnh"
                  className="border-secondary"
                />
              </Form.Group>
            </div>

            <div className="col-md-5">
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium d-flex align-items-center">
                  <FaImage className="me-2" />
                  Tải lên hình ảnh
                </Form.Label>
                <div
                  className={`upload-zone position-relative ${dragActive ? 'drag-active' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{
                    border: `2px dashed ${dragActive ? '#0d6efd' : '#dee2e6'}`,
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: dragActive ? '#e7f1ff' : '#fff',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                    style={{ cursor: 'pointer' }}
                    disabled={uploading}
                  />
                  <div className="text-center">
                    {uploading ? (
                      <>
                        <Spinner animation="border" variant="primary" size="sm" className="mb-2" />
                        <p className="mb-0">Đang tải lên... {uploadProgress}%</p>
                      </>
                    ) : (
                      <>
                        <FaUpload className="mb-2" style={{ fontSize: '2rem', color: '#6c757d' }} />
                        <p className="mb-0">Kéo thả hoặc click để tải ảnh lên</p>
                        <small className="text-muted d-block mt-1">
                          Hỗ trợ: JPG, PNG, GIF (Tối đa 10MB)
                        </small>
                      </>
                    )}
                  </div>
                </div>

                {formData.image_url && (
                  <div className="mt-3 text-center">
                    <div className="position-relative d-inline-block">
                      <img 
                        src={formData.image_url} 
                        alt="Preview"
                        className="rounded"
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '200px',
                          border: '2px solid #dee2e6'
                        }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2 rounded-circle"
                        style={{ width: '24px', height: '24px', padding: 0 }}
                        onClick={() => setFormData(prev => ({ ...prev, image: '', image_url: '' }))}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleClose}>
            Hủy
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Đang tải lên...
              </>
            ) : (
              isEditing ? 'Cập nhật' : 'Thêm mới'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
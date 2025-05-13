import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaImage, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import ImgBBConfig from '../../config/ImgBB.config';

const ProductIntroModal = ({ 
  show, 
  handleClose, 
  product = null,
  isEditing = false,
  onSubmit,
  submitting = false
}) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    subtitle: product?.subtitle || '',
    image_url: product?.image_url || '',
    button1_text: product?.button1_text || '',
    button1_link: product?.button1_link || '',
    button2_text: product?.button2_text || '',
    button2_link: product?.button2_link || ''
  });

  // Reset form data when product changes
  useEffect(() => {
    if (show) {
      setFormData({
        title: product?.title || '',
        subtitle: product?.subtitle || '',
        image_url: product?.image_url || '',
        button1_text: product?.button1_text || '',
        button1_link: product?.button1_link || '',
        button2_text: product?.button2_text || '',
        button2_link: product?.button2_link || ''
      });
      setFormErrors({});
      setUploadError('');
    }
  }, [product, show]);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size
    if (file.size > ImgBBConfig.maxSizeBytes) {
      setUploadError(`Kích thước file không được vượt quá ${ImgBBConfig.maxSizeBytes / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    if (!ImgBBConfig.allowedTypes.includes(file.type)) {
      setUploadError('Định dạng file không được hỗ trợ. Vui lòng sử dụng JPG, PNG, GIF hoặc WEBP');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${ImgBBConfig.uploadUrl}?key=${ImgBBConfig.apiKey}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      );

      if (!response.data?.data?.url) {
        throw new Error('Invalid response from image upload service');
      }

      setFormData(prev => ({
        ...prev,
        image_url: response.data.data.url
      }));
    } catch (error) {
      let errorMessage = 'Không thể tải lên hình ảnh. Vui lòng thử lại.';
      
      if (error.response) {
        // Handle specific ImgBB error responses
        switch (error.response.status) {
          case 400:
            errorMessage = 'File không hợp lệ hoặc quá lớn';
            break;
          case 401:
            errorMessage = 'Lỗi xác thực API key';
            break;
          case 429:
            errorMessage = 'Đã vượt quá giới hạn tải lên. Vui lòng thử lại sau';
            break;
          default:
            errorMessage = error.response.data?.error?.message || errorMessage;
        }
      }
      
      setUploadError(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ImgBBConfig.allowedTypes
    },
    maxSize: ImgBBConfig.maxSizeBytes,
    multiple: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Tiêu đề không được để trống';
    }
    
    if (!formData.image_url) {
      errors.image = 'Vui lòng tải lên hình ảnh';
    }
    
    if (formData.button1_text && !formData.button1_link) {
      errors.button1_link = 'Vui lòng nhập link cho nút 1';
    }
    
    if (formData.button2_text && !formData.button2_link) {
      errors.button2_link = 'Vui lòng nhập link cho nút 2';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setUploading(true);
      await onSubmit?.(formData);
    } catch (error) {
      setUploadError('Không thể lưu thông tin. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Chỉnh sửa giới thiệu' : 'Thêm giới thiệu mới'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={7}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề"
                  isInvalid={!!formErrors.title}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.title}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Phụ đề</Form.Label>
                <Form.Control 
                  type="text" 
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="Nhập phụ đề"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nút 1 - Text</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="button1_text"
                      value={formData.button1_text}
                      onChange={handleInputChange}
                      placeholder="Nhập text cho nút 1"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nút 1 - Link</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="button1_link"
                      value={formData.button1_link}
                      onChange={handleInputChange}
                      placeholder="Nhập link cho nút 1"
                      isInvalid={!!formErrors.button1_link}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.button1_link}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nút 2 - Text</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="button2_text"
                      value={formData.button2_text}
                      onChange={handleInputChange}
                      placeholder="Nhập text cho nút 2"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nút 2 - Link</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="button2_link"
                      value={formData.button2_link}
                      onChange={handleInputChange}
                      placeholder="Nhập link cho nút 2"
                      isInvalid={!!formErrors.button2_link}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.button2_link}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <div
                  {...getRootProps()}
                  className={`border rounded p-4 text-center ${
                    isDragActive ? 'border-primary bg-light' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <input {...getInputProps()} />
                  {formData.image_url ? (
                    <div className="position-relative">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, image_url: '' }));
                        }}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FaImage className="display-4 text-muted mb-2" />
                      <p className="mb-1">
                        {isDragActive ? (
                          'Thả hình ảnh vào đây'
                        ) : (
                          <>
                            <FaUpload className="me-2" />
                            Kéo thả hoặc click để chọn hình
                          </>
                        )}
                      </p>
                      <small className="text-muted">
                        PNG, JPG, GIF hoặc WEBP (tối đa {ImgBBConfig.maxSizeBytes / (1024 * 1024)}MB)
                      </small>
                    </>
                  )}
                </div>
                {uploading && (
                  <div className="mt-2">
                    <div className="progress" style={{ height: '3px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                {uploadError && (
                  <Alert variant="danger" className="mt-2 py-2">
                    {uploadError}
                  </Alert>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose} 
            disabled={uploading || submitting}
          >
            Hủy
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={uploading || submitting}
          >
            {(uploading || submitting) ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Đang xử lý...
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

export default ProductIntroModal;
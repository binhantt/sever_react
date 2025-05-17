import React, { useState, useCallback } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ImgBBConfig from '../../../config/ImgBB.config';

const ImageManagement = ({ formData, handleChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState({
    uploading: false,
    progress: 0,
    error: null
  });

  const uploadToImgBB = async (file) => {
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
            setUploadStatus(prev => ({ ...prev, progress }));
          }
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading to ImgBB:', error);
      throw error;
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploadStatus({ uploading: true, progress: 0, error: null });

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        try {
          const imageUrl = await uploadToImgBB(file);
          return imageUrl;
        } catch (error) {
          console.error('Error uploading file:', error);
          return null;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);

      if (validUrls.length > 0) {
        const newImages = validUrls.map(url => ({
          url: url,
          product_id: formData.id || null,
          sort_order: (formData.images || []).length + 1,
          created_at: new Date().toISOString()
        }));

        handleChange({
          target: {
            name: 'images',
            value: [...(formData.images || []), ...newImages]
          }
        });

        // If no main image is set, set the first uploaded image as main
        if (!formData.main_image_url && validUrls[0]) {
          handleChange({
            target: {
              name: 'main_image_url',
              value: validUrls[0]
            }
          });
        }
      }
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, error: 'Lỗi tải ảnh lên. Vui lòng thử lại.' }));
    } finally {
      setUploadStatus({ uploading: false, progress: 0, error: null });
    }
  }, [formData.images, formData.main_image_url, handleChange, formData.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;

    const newImages = [...(formData.images || [])];
    const newImageData = {
      url: imageUrl,
      product_id: formData.id || null,
      sort_order: newImages.length + 1,
      created_at: new Date().toISOString()
    };

    newImages.push(newImageData);

    handleChange({
      target: {
        name: 'images',
        value: newImages
      }
    });

    setImageUrl('');
  };

  const handleMainImageDelete = () => {
    handleChange({
      target: {
        name: 'main_image_url',
        value: ''
      }
    });
  };

  const removeImage = (index) => {
    const newImages = [...(formData.images || [])];
    const removedImage = newImages[index];

    // If removing the main image, clear main_image_url
    if (removedImage && removedImage.url === formData.main_image_url) {
      handleChange({
        target: {
          name: 'main_image_url',
          value: ''
        }
      });
    }

    newImages.splice(index, 1);
    handleChange({
      target: {
        name: 'images',
        value: newImages
      }
    });
  };

  const setAsMainImage = (imageUrl) => {
    handleChange({
      target: {
        name: 'main_image_url',
        value: imageUrl
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h5 className="mb-4 text-primary d-flex align-items-center">
        <i className="fas fa-images me-2"></i>
        Quản lý hình ảnh
      </h5>

      {/* Main Image */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 d-flex align-items-center">
          <i className="fas fa-star me-2 text-warning"></i>
          Ảnh chính sản phẩm
        </h6>
        <div className="main-image-container mb-3">
          {formData.main_image_url ? (
            <div className="position-relative" style={{ maxWidth: '100%' }}>
              <img
                src={formData.main_image_url}
                alt="Main product"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'contain',
                  border: '2px solid #dee2e6',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease'
                }}
              />
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2 rounded-circle"
                onClick={handleMainImageDelete}
                style={{ width: '28px', height: '28px', padding: '0' }}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '100%',
                height: '250px',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="text-center text-muted">
                <i className="fas fa-image mb-2" style={{ fontSize: '2.5rem' }}></i>
                <div>Chưa có ảnh chính</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images */}
      <div>
        <h6 className="fw-bold mb-3 d-flex align-items-center">
          <i className="fas fa-plus-circle me-2 text-success"></i>
          Thêm ảnh sản phẩm
        </h6>

        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`upload-zone mb-3 ${uploadStatus.uploading ? 'uploading' : ''}`}
          style={{
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: isDragActive ? '#e7f1ff' : '#fff',
            cursor: uploadStatus.uploading ? 'wait' : 'pointer',
            position: 'relative'
          }}
        >
          <input {...getInputProps()} disabled={uploadStatus.uploading} />
          <div className="text-center">
            {uploadStatus.uploading ? (
              <>
                <Spinner animation="border" variant="primary" size="sm" className="mb-2" />
                <p className="mb-1">Đang tải lên... {uploadStatus.progress}%</p>
              </>
            ) : (
              <>
                <i className={`fas fa-${isDragActive ? 'file-import' : 'cloud-upload-alt'} mb-2`}
                  style={{ fontSize: '2rem', color: isDragActive ? '#0d6efd' : '#6c757d' }}></i>
                <p className="mb-1" style={{ color: isDragActive ? '#0d6efd' : 'inherit' }}>
                  {isDragActive
                    ? 'Thả ảnh vào đây...'
                    : 'Kéo thả ảnh vào đây hoặc click để chọn ảnh'}
                </p>
              </>
            )}
            <small className="text-muted d-block">
              Hỗ trợ: JPG, PNG, GIF, WEBP (Tối đa 10MB)
            </small>
          </div>
          {uploadStatus.error && (
            <div className="text-danger mt-2 text-center">
              <i className="fas fa-exclamation-circle me-1"></i>
              {uploadStatus.error}
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-light border-secondary">
            <i className="fas fa-link"></i>
          </span>
          <Form.Control
            type="text"
            placeholder="Hoặc nhập URL ảnh..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border-secondary"
          />
          <Button
            variant="primary"
            onClick={handleAddImage}
            disabled={!imageUrl.trim()}
          >
            <i className="fas fa-plus me-1"></i>
            Thêm
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="d-flex flex-wrap gap-3">
            {(formData.images || []).map((img, index) => (
              <div
                key={img.id || index}
                className="position-relative"
                style={{
                  width: '120px',
                  height: '120px',
                  border: img.url === formData.main_image_url
                    ? '2px solid #ffc107'
                    : '2px solid #dee2e6',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={img.url}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onClick={() => setAsMainImage(img.url)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-1 rounded-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    padding: '0',
                    fontSize: '12px',
                    zIndex: 2
                  }}
                >
                  <i className="fas fa-times"></i>
                </Button>
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-1"
                  style={{
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <Button
                    variant={img.url === formData.main_image_url ? "warning" : "light"}
                    size="sm"
                    className="w-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAsMainImage(img.url);
                    }}
                    style={{
                      fontSize: '12px'
                    }}
                  >
                    {img.url === formData.main_image_url ? (
                      <>
                        <i className="fas fa-star me-1"></i>
                        Ảnh chính
                      </>
                    ) : (
                      <>
                        <i className="far fa-star me-1"></i>
                        Đặt làm ảnh chính
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageManagement; 
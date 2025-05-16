import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import ImgBBConfig from '../../config/ImgBB.config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManufacturers } from '../../store/Api/manufacturers';

const ProductModal = ({ show, handleClose, isEditing, product, handleSubmit }) => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(state => state.manufacturers.data);

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        name: '',
        price: 0,
        sku: '',
        description: '',
        is_active: true,
        manufacturer_id: '',
        main_image_url: '',
        stock: 0,
        weight: 0,
        dimensions: '',
        quantity: 0,
        product_category_ids: [],
        images: [],
        details: [],
        warranties: []
      });
      setPreviewImages([]);
      setExistingImages([]);
    } else if (product) {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        sku: product?.sku || '',
        category_id: product?.category_id || '',
        weight: product?.weight || '',
        dimensions: product?.dimensions || '',
        is_active: product?.is_active || 1,
        main_image_url: product?.main_image_url || '',
        images: product?.images || [],
        warranties: product?.warranties || [],
        manufacturer_id: product?.manufacturer_id || '',
        categories: product?.categories || [],
        details: product?.details || []
      });
      setExistingImages(product.images.map(img => ({
        id: img.id,
        preview: img.image_url,
        isExisting: true
      })));
    }
  }, [isEditing, product]);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    sku: '',
    description: '',
    is_active: true,
    manufacturer_id: '',
    main_image_url: '',
    stock: 0,
    weight: 0,
    dimensions: '',
    quantity: 0,
    product_category_ids: [],
    images: [],
    details: [],
    warranties: []
  });

  // Add this handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const {
    name = '',
    description = '',
    price = '',
    stock = 0,
    is_active = 1,
    main_image_url = '',
    category_ids = [],
    images = [],
    sku = '',
    weight = '',
    dimensions = '',
    details = [],
    warranties = [],
    manufacturer_id = '' // Add this line with default empty string
  } = formData || {};
  console.log('formData', formData.categories);
  const categoriesformData = formData?.categories === null ? [] : formData?.categories || [];
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [categories, setCategories] = useState([]);

  const [imageUrl, setImageUrl] = useState('');

  const [uploadStatus, setUploadStatus] = useState({
    uploading: false,
    progress: 0,
    error: null
  });
  // Add to handleChange functio
  const imageGalleryStyles = {
    '.image-gallery .position-relative:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    '.image-gallery .position-relative:hover .image-overlay': {
      opacity: 1
    },
    '.upload-zone': {
      transition: 'all 0.3s ease'
    },
    '.upload-zone:hover': {
      backgroundColor: '#e9ecef !important',
      borderColor: '#6c757d !important'
    },
    '.drag-active': {
      borderColor: '#0d6efd !important',
      backgroundColor: '#e7f1ff !important'
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ApiConfig.severAdmin}/categories?page&limit=10000`);
        setCategories(response.data?.data || response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {

    const safeCategories = Array.isArray(categories) ? categories : [];
    if (!isEditing) {
      setPreviewImages([]);
      setExistingImages([]);

    } else if (product?.images) {
      setExistingImages(product.images.map(img => ({
        id: img.id,
        preview: img.image_url,
        isExisting: true
      })));

    }
  }, [isEditing]);

  useEffect(() => {
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.id = 'product-modal-styles';
    styleSheet.textContent = Object.entries(imageGalleryStyles)
      .map(([selector, styles]) =>
        `${selector} {${Object.entries(styles)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join(';')}}`
      )
      .join('\n');
    document.head.appendChild(styleSheet);

    // Cleanup
    return () => {
      const existingStyle = document.getElementById('product-modal-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Call the handleSubmit from props
  };

  // Debugging suggestion for handleImageChange
  const handleImageChange = (e) => {
    console.log('Files received:', e.target.files); // Debug file input
    const files = Array.from(e.target.files);
    console.log('Processed files:', files); // Verify array conversion
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false
    }));
    setPreviewImages([...previewImages, ...newImages]);
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;

    const newImages = [...(formData.images || [])];
    const newImageData = {
      image_url: imageUrl,
      product_id: product?.id || null,
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
    if (removedImage && removedImage.image_url === formData.main_image_url) {
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

  const allImages = [...existingImages, ...previewImages];
  const handleWarrantyChange = (index, e) => {
    const { name, value } = e.target;
    const warranties = formData.warranties || [];
    const updatedWarranties = [...warranties];

    if (!updatedWarranties[index]) {
      updatedWarranties[index] = {};
    }

    updatedWarranties[index] = {
      ...updatedWarranties[index],
      [name]: value
    };

    handleChange({
      target: {
        name: 'warranties',
        value: updatedWarranties
      }
    });
  };

  const addWarranty = () => {
    const warranties = formData.warranties || [];
    handleChange({
      target: {
        name: 'warranties',
        value: [...warranties, { warranty_period: '', warranty_provider: '', warranty_conditions: '' }]
      }
    });
  };

  const removeWarranty = (index) => {
    const warranties = formData.warranties || [];
    const updatedWarranties = warranties.filter((_, i) => i !== index);
    handleChange({
      target: {
        name: 'warranties',
        value: updatedWarranties
      }
    });
  };

  const handleMainImageChange = (e) => {
    const url = e.target.value;
    handleChange({
      target: {
        name: 'main_image_url',
        value: url
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
          image_url: url,
          product_id: product?.id || null,
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
  }, [formData.images, formData.main_image_url, handleChange, product]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)', backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          <div className="row g-4">
            {/* Cột 1 - Thông tin chung */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h5 className="mb-4 text-primary">Thông tin chung</h5>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Danh mục sản phẩm</Form.Label>
                 
                  <Form.Select
                    name="category_id"
                    value={formData.category_ids?.length > 0 ? formData.category_ids[0] : ''}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (!formData.category_ids?.includes(selectedId)) {
                        handleChange({
                          target: {
                            name: 'category_ids',
                            value: [...(formData.category_ids || []), selectedId]
                          }
                        });
                      }
                    }}
                    required
                    className="border-secondary"
                  >
                    <option value="">Chọn danh mục</option>
                    {Array.isArray(categories) && categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                
                {/* Selected categories display */}
                {formData.category_ids?.length > 0 && (
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {formData.category_ids.map((id) => {
                      const category = categories.find(c => c.id === Number(id));
                      return (
                        <span key={id} className="badge bg-primary text-white">
                          {category ? category.name : `ID ${id}`}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            aria-label="Remove"
                            onClick={() => {
                              handleChange({
                                target: {
                                  name: 'category_ids',
                                  value: formData.category_ids.filter(cid => cid !== id)
                                }
                              });
                            }}
                          />
                        </span>
                      );
                    })}
                  </div>
                )}
                       <div className="mt-2 d-flex flex-wrap gap-2">
                {categoriesformData.map((name) => (
                  <span key={name.id} className="badge bg-primary text-white">
                    {name.name}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Remove"
                      onClick={() => {
                        handleChange({
                          target: {
                            name: 'category_ids',
                            value: formData.category_ids.filter(id => id !== name)
                          }
                        });
                      }}
                    />
                  </span>
                ))}
                </div>
                
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nhà sản xuất</Form.Label>
                  <Form.Select
                    name="manufacturer_id"
                    value={manufacturer_id || ''}
                    onChange={handleChange}
                    className="border-secondary"
                  >
                    <option value="">Chọn nhà sản xuất</option>
                    {(manufacturers.data || []).map(manufacturer => (

                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    rows={3}
                    className="border-secondary"
                  />
                </Form.Group>

                <div className="row g-3">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label className="fw-bold">Giá</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        required
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label className="fw-bold">Số lượng tồn kho</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={handleChange}
                        required
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột 2 - Quản lý hình ảnh */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h5 className="mb-4 text-primary d-flex align-items-center">
                  <i className="fas fa-images me-2"></i>
                  Quản lý hình ảnh
                </h5>

                {/* Ảnh chính */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 d-flex align-items-center">
                    <i className="fas fa-star me-2 text-warning"></i>
                    Ảnh chính sản phẩm
                  </h6>
                  <div className="main-image-container mb-3">
                    {main_image_url ? (
                      <div className="position-relative" style={{ maxWidth: '100%' }}>
                        <img
                          src={main_image_url}
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
                  <div className="input-group">
                    <span className="input-group-text bg-light border-secondary">
                      <i className="fas fa-link"></i>
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Nhập URL ảnh chính..."
                      value={main_image_url || ''}
                      onChange={handleMainImageChange}
                      className="border-secondary"
                    />
                  </div>
                </div>

                {/* Thêm ảnh phụ */}
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
                            border: img.image_url === main_image_url
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
                            src={img.image_url}
                            alt={`Product ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            onClick={() => setAsMainImage(img.image_url)}
                          />
                          {/* Delete button always visible */}
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
                          {/* Overlay with additional actions */}
                          <div
                            className="position-absolute bottom-0 start-0 w-100 p-1"
                            style={{
                              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                              transition: 'opacity 0.3s ease'
                            }}
                          >
                            <Button
                              variant={img.image_url === main_image_url ? "warning" : "light"}
                              size="sm"
                              className="w-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAsMainImage(img.image_url);
                              }}
                              style={{
                                fontSize: '12px'
                              }}
                            >
                              {img.image_url === main_image_url ? (
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
            </div>

            {/* Cột 3 - Thông tin chi tiết */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded shadow-sm mb-4">
                <h5 className="mb-4 text-primary">Thông tin chi tiết</h5>
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Hoạt động"
                    name="is_active"
                    checked={is_active === 1}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'is_active',
                        value: e.target.checked ? 1 : 0
                      }
                    })}
                    className="fw-bold"
                  />
                </Form.Group>

                <div className="row g-3">
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="fw-bold">SKU</Form.Label>
                      <Form.Control
                        type="text"
                        name="sku"
                        value={formData.sku || ''}
                        onChange={handleChange}
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label className="fw-bold">Trọng lượng (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        step="0.01"
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label className="fw-bold">Kích thước</Form.Label>
                      <Form.Control
                        type="text"
                        name="dimensions"
                        value={formData.dimensions || ''}
                        onChange={handleChange}
                        placeholder="160.9 x 77.8 x 8.3 mm"
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 text-primary">Thông tin bảo hành</h5>
                  <Button variant="primary" size="sm" onClick={addWarranty}>
                    + Thêm bảo hành
                  </Button>
                </div>

                {(formData.warranties || []).map((warranty, index) => (
                  <div key={index} className="border rounded p-3 mb-3 position-relative bg-light">
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => removeWarranty(index)}
                    >
                      ×
                    </Button>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Thời gian bảo hành</Form.Label>
                      <Form.Control
                        type="text"
                        name="warranty_period"
                        value={warranty.warranty_period || ''}
                        onChange={(e) => handleWarrantyChange(index, e)}
                        placeholder="12 tháng"
                        className="border-secondary"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Nhà cung cấp BH</Form.Label>
                      <Form.Control
                        type="text"
                        name="warranty_provider"
                        value={warranty.warranty_provider || ''}
                        onChange={(e) => handleWarrantyChange(index, e)}
                        placeholder="Apple Vietnam"
                        className="border-secondary"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Điều kiện BH</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="warranty_conditions"
                        value={warranty.warranty_conditions || ''}
                        onChange={(e) => handleWarrantyChange(index, e)}
                        rows={2}
                        placeholder="Bảo hành chính hãng"
                        className="border-secondary"
                      />
                    </Form.Group>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </Modal.Footer>

    </Modal>
  );
};


export default ProductModal;


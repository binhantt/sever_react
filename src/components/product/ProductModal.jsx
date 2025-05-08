import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';

import axios from 'axios';
import ApiConfig from '../../config/Api.config';
const ProductModal = ({
  show,
  handleClose,
  handleSubmit,
  product = null,
  isEditing = false,
  handleChange,
  formData,
}) => {

  const {
    name = '',
    description = '',
    price = '',
    stock = 0,
    is_active = 1,
    main_image_url = '',
    category_id = '',
    images = []
  } = formData || {};

  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ApiConfig.severAdmin}/categories?page&limit=10000`);
        // Ensure we're setting an array
        setCategories(response.data?.data || response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]); // Set empty array on error
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Xử lý
    console.log('Form Data:', categories); // Log formData để kiểm tra
    const safeCategories = Array.isArray(categories) ? categories : [];
    if (!isEditing) {
      
      console.log(categories.data)
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false
    }));
    setPreviewImages([...previewImages, ...newImages]);
  };

  const removeImage = (index) => {
    // Xử lý cả ảnh hiện có và ảnh preview
    if (index < existingImages.length) {
      const newImages = [...existingImages];
      newImages.splice(index, 1);
      setExistingImages(newImages);
    } else {
      const newImages = [...previewImages];
      newImages.splice(index - existingImages.length, 1);
      setPreviewImages(newImages);
    }
  }
  const allImages = [...existingImages, ...previewImages];
  const handleWarrantyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWarranties = [...formData.warranties];
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
  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
          <div className="container-fluid">
            <div className="row">
              {/* Cột 1 - Thông tin chung */}
              <div className="col-md-4 border-end pe-3">
                <h5 className="mb-3">Thông tin chung</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                {/* Phần danh mục riêng biệt */}
                <div className="border-top pt-3 mt-3">
                  <h6>Danh mục sản phẩm</h6>
                
                  <Form.Select
                    name="category_id" 
                    value={category_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {Array.isArray(categories) && categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange}  // Add onChange handler
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange}  // Add onChange handler
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng tồn kho</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={stock}
                    onChange={handleChange}  // Add onChange handler
                    required
                  />
                </Form.Group>
              </div>

              {/* Cột 2 - Thông tin riêng */}
              <div className="col-md-4 border-end px-3">
                <h5 className="mb-3">Thông tin riêng</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh chính</Form.Label>
                  <Form.Control
                    type="text"
                    name="main_image_url"
                    value={main_image_url}
                    onChange={handleChange}  // Add onChange handler
                  />
                </Form.Group>
                <Form.Group className="mb-3">
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
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh sản phẩm</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <div className="d-flex flex-wrap mt-2">
                    {allImages.map((img, index) => (
                      <div key={img.id || index} className="position-relative me-2 mb-2">
                        <Image
                          src={img.preview}
                          thumbnail
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0"
                          onClick={() => removeImage(index)}
                          style={{ transform: 'translate(50%, -50%)' }}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={formData.sku || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trọng lượng (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    name="weight"
                    value={formData.weight || ''}
                    onChange={handleChange}
                    step="0.01"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Kích thước</Form.Label>
                  <Form.Control
                    type="text"
                    name="dimensions"
                    value={formData.dimensions || ''}
                    onChange={handleChange}
                    placeholder="VD: 160.9 x 77.8 x 8.3 mm"
                  />
                </Form.Group>
              </div>

           
                <div className="col-md-4 ps-3">
                <h5 className="mb-3">Thông tin bảo hành</h5>
                {formData.warranties?.length > 0 ? (
                  formData.warranties.map((element, index) => (
                    <div key={index}>
                      <Form.Group className="mb-3">
                        <Form.Label>Thời gian bảo hành</Form.Label>
                        <Form.Control
                          type="text"
                          name="warranty_period"
                          value={element.warranty_period || ''}
                          onChange={(e) => handleWarrantyChange(index, e)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Nhà cung cấp BH</Form.Label>
                        <Form.Control
                          type="text"
                          name="warranty_provider"
                          value={element.warranty_provider || ''}
                          onChange={handleChange}
                          placeholder="VD: Apple Vietnam"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Điều kiện BH</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="warranty_conditions"
                          value={element.warranty_conditions || ''}
                          onChange={handleChange}
                          rows={2}
                          placeholder="VD: Bảo hành chính hãng"
                        />
                      </Form.Group>
                    </div>
                  ))
                ) : (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian bảo hành</Form.Label>
                      <Form.Control
                        type="text"
                        name="warranty_period"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nhà cung cấp BH</Form.Label>
                      <Form.Control
                        type="text"
                        name="warranty_provider"
                        onChange={handleChange}
                        placeholder="VD: Apple Vietnam"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Điều kiện BH</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="warranty_conditions"
                        onChange={handleChange}
                        rows={2}
                        placeholder="VD: Bảo hành chính hãng"
                      />
                    </Form.Group>
                  </div>
                )}
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
      </Form>
    </Modal>
  );
};


export default ProductModal;
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';

const ProductModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  product = null,
  isEditing = false,
  handleChange,
  formData,
  categories = [] // Thêm prop categories
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

  // Thêm state để lưu ảnh hiện có khi edit
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (isEditing && product?.images) {
      setExistingImages(product.images.map(img => ({
        id: img.id,
        preview: img.image_url,
        isExisting: true
      })));
    }
  }, [isEditing, product]);

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
  };

  // Kết hợp ảnh hiện có và ảnh preview để hiển thị
  const allImages = [...existingImages, ...previewImages];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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

          <Form.Group className="mb-3">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              name="category_id"
              value={category_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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
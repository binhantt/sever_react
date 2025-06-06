import React from 'react';
import { Form } from 'react-bootstrap';

const GeneralInfo = ({ formData, handleChange, categories, manufacturers }) => {
 
  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h5 className="mb-4 text-primary">Thông tin chung</h5>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Tên sản phẩm</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          required
          className="border-secondary"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Danh mục sản phẩm</Form.Label>
        <Form.Select
          name="id_categories"
          value={formData.id_categories || ''}
          onChange={handleChange}
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
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Nhà sản xuất</Form.Label>
        <Form.Select
          name="manufacturer_id"
          value={formData.manufacturer_id || ''}
          onChange={handleChange}
          required
          className="border-secondary"
        >
          {!formData.manufacturers?.name && <option value="">Chọn nhà sản xuất</option>}
          {formData.manufacturers?.name && (
            <option value={formData.manufacturers.id}>
              {formData.manufacturers.name}
            </option>
          )}
          {Array.isArray(manufacturers?.data) && manufacturers.data.map(manufacturer => (
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
          value={formData.description || ''}
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
              value={formData.price || ''}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
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
              value={formData.stock || ''}
              onChange={handleChange}
              required
              min="0"
              step="1"
              className="border-secondary"
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
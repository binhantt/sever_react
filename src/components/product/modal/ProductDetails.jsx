import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductDetails = ({ formData, handleChange }) => {


  const handleWarrantyChange = (index, e) => {
    const { name, value } = e.target;
    const warranties = [...(formData.warranties || [])];
    if (!warranties[index]) {
      warranties[index] = {};
    }

    warranties[index] = {
      ...warranties[index],
      [name]: value
    };

    // Keep only one warranty entry
    if (index > 0) {
      warranties.splice(index, 1);
    }

    handleChange({
      target: {
        name: 'warranties',
        value: warranties
      }
    });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const details = [...(formData.details || [])]
    if (!details[index]) {
      details[index] = {};
    }

    details[index] = {
      ...details[index],
      [name]: value,
      sort_order: index + 1
    };

    // Remove detail if both fields are empty
    if (!details[index].spec_name && !details[index].spec_value) {
      details.splice(index, 1);
    }

    handleChange({
      target: {
        name: 'details',
        value: details
      }
    });
  };

  const addWarranty = () => {
    // Only allow one warranty entry
    if (formData.warranties?.length > 0) {
      return;
    }
    
    handleChange({
      target: {
        name: 'warranties',
        value: [{ warranty_period: '', warranty_provider: '', warranty_conditions: '' }]
      }
    });
  };

  const addDetail = () => {
    const details = formData.details || [];

    handleChange({
      target: {
        name: 'details',
        value: [...details, { spec_name: '', spec_value: '', sort_order: details.length + 1 }]
      }
    });
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h5 className="mb-4 text-primary">Thông tin chi tiết</h5>
        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="Hoạt động"
            name="is_active"
            checked={formData.is_active === 1}
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
                min="0"
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

      {/* Warranty Information */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
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
              onClick={() => {
                const warranties = formData.warranties || [];
                handleChange({
                  target: {
                    name: 'warranties',
                    value: warranties.filter((_, i) => i !== index)
                  }
                });
              }}
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
                placeholder="Ví dụ: 12 tháng"
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
                placeholder="Ví dụ: Hãng sản xuất"
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
                placeholder="Nhập điều kiện bảo hành"
                className="border-secondary"
              />
            </Form.Group>
          </div>
        ))}
      </div>
   
      {/* Product Specifications */}
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 text-primary">Thông tin chi tiết sản phẩm</h5>
          <Button variant="primary" size="sm" onClick={addDetail}>
            + Thêm thông số
          </Button>
        </div>
    
        {Array.isArray(formData.details) && formData.details.map((detail, index) => (
          <div key={index} className="border rounded p-3 mb-3 position-relative bg-light">
            <Button
              variant="danger"
              size="sm"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => {
                const details = formData.details || [];
                handleChange({
                  target: {
                    name: 'details',
                    value: details.filter((_, i) => i !== index)
                  }
                });
              }}
            >
              ×
            </Button>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Tên thông số</Form.Label>
              <Form.Control
                type="text"
                name="spec_name"
                value={detail.spec_name || ''}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Ví dụ: Màu sắc, Kích thước"
                className="border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Giá trị</Form.Label>
              <Form.Control
                type="text"
                name="spec_value"
                value={detail.spec_value || ''}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Ví dụ: Đỏ, XL"
                className="border-secondary"
              />
            </Form.Group>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetails;

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManufacturers } from '../../store/Api/manufacturers';
import { toast } from 'react-hot-toast';
import GeneralInfo from './modal/GeneralInfo';
import ImageManagement from './modal/ImageManagement';
import ProductDetails from './modal/ProductDetails';

const ProductModal = ({ show, handleClose, product, onSubmit }) => {
  const dispatch = useDispatch();
  
  const { data: categories } = useSelector(state => state.category);
  const { data: manufacturers } = useSelector(state => state.manufacturers);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    weight: '',
    quantity: '' ||1,
    is_active: 1,
    id_categories: '',
    manufacturer_id: '',
    sku: '',
    dimensions: '',
    main_image_url: '',
    images: [],
    details: [{
      spec_name: '',
      spec_value: '',
      sort_order: 1
    }],
    warranties: [{
      warranty_period: '',
      warranty_provider: '',
      warranty_conditions: ''
    }]
  });

  useEffect(() => {
    if (product) {
      const formattedProduct = {
        ...product,
        id_categories: Number(product.id_categories) || (product.categories ? Number(product.categories.id) : ''),
        manufacturer_id: product.manufacturer_id
          || (product.manufacturers && product.manufacturers.id)
          || '',
        images: product.images || [],
        details: Array.isArray(product.details) && product.details.length > 0
          ? product.details.map(detail => ({
              spec_name: detail.spec_name || '',
              spec_value: detail.spec_value || '',
              sort_order: detail.sort_order || 1
            }))
          : [{ spec_name: '', spec_value: '', sort_order: 1 }],
        warranties: product.warranty
          ? [{
              warranty_period: product.warranty.warranty_period || '',
              warranty_provider: product.warranty.warranty_provider || '',
              warranty_conditions: product.warranty.warranty_conditions || ''
            }]
          : [{
              warranty_period: '',
              warranty_provider: '',
              warranty_conditions: ''
            }]
      };
      setFormData(formattedProduct);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        weight: '',
        quantity: '',
        is_active: 1,
        id_categories: '',
        manufacturer_id: '',
        sku: '',
        dimensions: '',
        main_image_url: '',
        images: [],
        details: [{
          spec_name: '',
          spec_value: '',
          sort_order: 1
        }],
        warranties: [{
          warranty_period: '',
          warranty_provider: '',
          warranty_conditions: ''
        }]
      });
    }
  }, [product]);
 
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateFormData = () => {
    // Required fields validation
    const requiredFields = ['name', 'price', 'stock', 'id_categories', 'manufacturer_id'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`);
      return false;
    }

    // Validate numeric fields
    if (formData.price <= 0) {
      toast.error('Giá sản phẩm phải lớn hơn 0');
      return false;
    }

    if (formData.stock < 0) {
      toast.error('Số lượng tồn kho không được âm');
      return false;
    }

    // Validate weight if provided
    if (formData.weight && formData.weight <= 0) {
      toast.error('Trọng lượng phải lớn hơn 0');
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!validateFormData()) {
      return;
    }

    // Format the data before submission
    const submitData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      weight: formData.weight ? Number(formData.weight) : null,
      quantity: formData.quantity ? Number(formData.quantity) : null,
      is_active: Number(formData.is_active),
      id_categories: Number(formData.id_categories),
      manufacturer_id: Number(formData.manufacturer_id),
      sku: formData.sku,
      dimensions: formData.dimensions,
      main_image_url: formData.main_image_url,
      images: formData.images?.map(img => ({
        url: img.url || img.image_url
      })) || [],
      productDetails: formData.details
        ?.filter(detail => detail.spec_name && detail.spec_value)
        .map((detail, index) => ({
          spec_name: detail.spec_name,
          spec_value: detail.spec_value,
          sort_order: index + 1
        })) || [],
      warrantyData: formData.warranties?.[0] ? {
        warranty_period: formData.warranties[0].warranty_period || null,
        warranty_provider: formData.warranties[0].warranty_provider || null,
        warranty_conditions: formData.warranties[0].warranty_conditions || null
      } : null
    };

    // Remove empty arrays and null values
    if (!submitData.images?.length) {
      delete submitData.images;
    }
    if (!submitData.details?.length) {
      delete submitData.details;
    }
    if (!submitData.warrantyData?.warranty_period && 
        !submitData.warrantyData?.warranty_provider && 
        !submitData.warrantyData?.warranty_conditions) {
      delete submitData.warrantyData;
    }

    onSubmit(submitData);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-8">
              <GeneralInfo
                formData={formData}
                handleChange={handleChange}
                categories={categories}
                manufacturers={manufacturers}
              />
              <ProductDetails
                formData={formData}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <ImageManagement
                formData={formData}
                handleChange={handleChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {product ? 'Cập nhật' : 'Thêm mới'} 
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductModal;


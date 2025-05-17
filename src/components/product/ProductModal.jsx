import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button, Form, Image, Spinner, Toast } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchManufacturers } from '../../store/Api/manufacturers';
import { toast } from 'react-hot-toast';
import { addProduct, updateProduct } from '../../store/Api/Product';
import GeneralInfo from './modal/GeneralInfo';
import ImageManagement from './modal/ImageManagement';
import ProductDetails from './modal/ProductDetails';

const ProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector(state => state.category);
  const { data: manufacturers } = useSelector(state => state.manufacturers);
  // In the initial formData state:
  const [formData, setFormData] = useState({
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
    details: [],
    warranties: [{
      warranty_period: '',
      warranty_provider: '',
      warranty_conditions: ''
    }]
  });


  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        id_categories: Number(product.id_categories) || (product.categories ? Number(product.categories.id) : ''),
        manufacturer_id: Number(product.manufacturer_id) || (product.manufacturers ? Number(product.manufacturers.id) : ''),
        images: product.images || [],
        details: product.details || [],
        warranties: product.warranties || []
      });
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
        details: [],
        warranties: []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Ensure we have the product id when updating
    const productId = product?.id;
    console.log('Product ID:', productId); // Debug log
    
    // In the handleFormSubmit function:
    const submitData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      weight: formData.weight ? Number(formData.weight) : null,
      quantity: formData.quantity ? Number(formData.quantity) : null,
      images: formData.images.map(img => ({
        url: img.url || img.image_url
      })),
      details: formData.details.map(detail => ({
        spec_name: detail.spec_name,
        spec_value: detail.spec_value,
        sort_order: detail.sort_order || 1
      })),
      warranties: formData.warranties
        .filter(w => w.warranty_period || w.warranty_provider || w.warranty_conditions)
        .map(warranty => ({
          warranty_period: warranty.warranty_period || null,
          warranty_provider: warranty.warranty_provider || null,
          warranty_conditions: warranty.warranty_conditions || null
        }))
    };

    console.log('Submitting data:', submitData);
   

    if (product) {
      dispatch(updateProduct({ 
        id: productId, 
        productData: submitData 
      }));
    } else {
      dispatch(addProduct(submitData));
    }
    
    handleClose();
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
        <Button  variant="primary" type="submit">
            {product ? 'Cập nhật' : 'Thêm mới'} 
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductModal;


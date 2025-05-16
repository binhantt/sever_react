import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Modal } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import ManufacturersList from '../components/manufacturers/ManufacturersList';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaList, FaPlus } from 'react-icons/fa';
import ManufacturersForm from '../components/manufacturers/ManufacturersForm';
import { 
  fetchManufacturers,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer 
} from '../store/Api/manufacturers';
import {  shallowEqual } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Manufacturers() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.manufacturers, shallowEqual);
  const [showModal, setShowModal] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedManufacturer(null);
    setShowModal(true);
  };

  const handleEdit = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading('Đang xử lý yêu cầu xóa...', {
      autoClose: false,
      closeButton: false
    });
    
    try {
      const confirmed = await new Promise((resolve) => {
        toast.update(toastId, {
          render: (
            <div>
              <p>Bạn có chắc muốn xóa nhà sản xuất này?</p>
              <div className="d-flex justify-content-center mt-3">
                <button 
                  className="btn btn-danger me-2"
                  onClick={() => {
                    toast.dismiss(toastId);
                    resolve(true);
                  }}
                >
                  Xóa
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    toast.dismiss(toastId);
                    resolve(false);
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          ),
          type: 'warning',
          isLoading: false,
          autoClose: false,
          closeOnClick: false,
          closeButton: false
        });
      });
  
      if (confirmed) {
        toast.loading('Đang xóa nhà sản xuất...', { toastId });
        await dispatch(deleteManufacturer(id));
        toast.success('Xóa nhà sản xuất thành công!', { toastId });
        await dispatch(fetchManufacturers());
      } else {
        toast.info('Đã hủy yêu cầu xóa', { toastId });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Xóa nhà sản xuất thất bại!', { toastId });
    } finally {
      // Ensure toast is dismissed if not already
      toast.dismiss(toastId);
    }
  };

  const handleSubmit = async (formData) => {
    const toastId = toast.loading(selectedManufacturer 
      ? 'Đang cập nhật nhà sản xuất...' 
      : 'Đang thêm nhà sản xuất mới...');
    
    try {
      if (selectedManufacturer) {
        await dispatch(updateManufacturer({ 
          id: selectedManufacturer.id, 
          ...formData 
        })).unwrap();
        toast.update(toastId, {
          render: 'Cập nhật nhà sản xuất thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
      } else {
        await dispatch(createManufacturer(formData)).unwrap();
        toast.update(toastId, {
          render: 'Thêm nhà sản xuất thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
      }
      setShowModal(false);
      dispatch(fetchManufacturers());
    } catch (error) {
      console.error('Error:', error);
      toast.update(toastId, {
        render: selectedManufacturer 
          ? 'Cập nhật nhà sản xuất thất bại!' 
          : 'Thêm nhà sản xuất thất bại!',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Nhà sản xuất" 
          icon={FaList}
          items={[
            { label: "Danh mục" },
            { label: "Nhà sản xuất", active: true }
          ]}
        />
        <Row className="mt-4">
          <Col xs={12} className="mb-3">
            <Button variant="primary" onClick={handleCreate}>
              <FaPlus className="me-2" /> Thêm nhà sản xuất
            </Button>
          </Col>
          <Col xs={12}>
            <div className="bg-white rounded">
              <ManufacturersList 
                data={data}
                loading={loading}
                error={error}
                onEdit={handleEdit} // This is correctly passed
                onDelete={handleDelete} // This is correctly passed
              />
            </div>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedManufacturer ? 'Cập nhật nhà sản xuất' : 'Thêm nhà sản xuất mới'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ManufacturersForm 
              initialValues={selectedManufacturer}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </Modal.Body>
        </Modal>
      </Container>
      <ToastContainer />
    </Layout>
  );
}
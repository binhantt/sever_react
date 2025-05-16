import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Modal } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import ParentCategoryList from '../components/category/ParentCategoryList';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaList, FaPlus } from 'react-icons/fa';
import ParentCategoryForm from '../components/category/ParentCategoryForm';
import { 
  fetchParentCategories,
  createParentCategory,
  updateParentCategory,
  deleteParentCategory 
} from '../store/Api/ParentCategory.Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParentCategory = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.parentCategory);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await dispatch(fetchParentCategories()).unwrap();
      } catch (err) {
        console.error('Lỗi khi tải danh mục cha:', err);
      }
    };
    loadCategories();
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchParentCategories());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    console.log(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    toast.warning(
      <div>
        <p>Bạn có chắc muốn xóa danh mục này?</p>
        <div className="d-flex justify-content-center mt-2">
          <button 
            className="btn btn-danger me-2"
            onClick={() => {
              toast.dismiss();
              dispatch(deleteParentCategory(id))
                .unwrap()
                .then(() => {
                  dispatch(fetchParentCategories());
                  toast.success('Xóa thành công!');
                })
                .catch(() => {
                  toast.error('Xóa thất bại!');
                });
            }}
          >
            Xóa
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => toast.dismiss()}
          >
            Hủy
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false
      }
    );
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await dispatch(updateParentCategory({ 
          id: selectedCategory.id, 
          name: formData.name 
        })).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createParentCategory(formData)).unwrap();
        toast.success('Thêm mới thành công!');
      }
      dispatch(fetchParentCategories());
      setShowModal(false);
    } catch (error) {
      toast.error('Thao tác thất bại!');
      console.error('Error:', error);
    }
  };


  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Danh mục cha" 
          icon={FaList}
          items={[
            { label: "Danh mục" },
            { label: "Danh mục cha", active: true }
          ]}
        />
        <Row className="mt-4">
          <Col xs={12} className="mb-3">
            <Button variant="primary" onClick={handleCreate}>
              <FaPlus className="me-2" /> Thêm danh mục
            </Button>
          </Col>
          <Col xs={12}>
            <div className="bg-white rounded">
              <ParentCategoryList 
                categories={data} 
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ParentCategoryForm 
              initialValues={selectedCategory}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </Modal.Body>
        </Modal>
      </Container>
      <ToastContainer />
    </Layout>
  );
};

export default ParentCategory;
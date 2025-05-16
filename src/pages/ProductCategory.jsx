import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../store/Api/Category';
import Layout from '../components/layout/Layout';
import { Breadcrumb, Button, Col, Container, Form, Row, Pagination, ButtonGroup, Card } from 'react-bootstrap';
import { FaSearch, FaBox, FaPlus, FaSync } from 'react-icons/fa';
import CategoryList from '../components/category/CategoryList';
import CategoryModal from '../components/category/CategoryModal';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchParentCategories } from '../store/Api/ParentCategory.Api';
  // In the parent component (ProductCategory.jsx)
  
  // When rendering CategoryModal:
  const ProductCategory = () => {
    if (typeof React.useContext === 'undefined') {
      return <div>Loading...</div>;
    }
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;
  
  const { data, loading, error, pagination, parentCategories } = useSelector(state => ({
    data: state.category?.data || [],
    loading: state.category?.loading || false,
    error: state.category?.error || null,
    pagination: state.category?.pagination || {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 1
    },
    parentCategories: state.parentCategory?.data || [] // Add this line
  }));

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [virtualData, setVirtualData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  useEffect(() => {
    if (Array.isArray(data)) {
      setVirtualData(data);
    }
  }, [data]);

  const fetchData = async (params = {}) => {
    try {
      await dispatch(getCategories({
        page: params.page || page,
        limit: params.limit || limit,
        search: params.search || debouncedSearchTerm
      }));
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Vui lòng chờ một lát trước khi thử lại');
      } else {
        console.error('Lỗi khi tải danh mục:', error);
        toast.error('Có lỗi xảy ra khi tải dữ liệu');
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
      dispatch(fetchParentCategories()).then(() => {
      
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, page, limit, debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    navigate(`/categories?page=${newPage}&limit=${limit}`);
  };

  const handleEdit = (category) => {
    const currentData = [...virtualData];

    setShowModal(true);
    
    return () => {
      setVirtualData(currentData);
      setShowModal(false);
      setCurrentCategory(null);
    };
  };
  
  const handleDelete = (id) => {
    const oldData = [...virtualData];
    
    toast.info(
      <div className="d-flex flex-column">
        <h6 className="mb-3">Xác nhận xóa</h6>
        <p className="mb-3">Bạn có chắc muốn xóa danh mục này?</p>
        <div className="d-flex justify-content-end gap-2">
          <Button 
            variant="light" 
            size="sm"
            onClick={() => toast.dismiss()}
          >
            Hủy
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              toast.dismiss();
              setVirtualData(prev => prev.filter(item => item.id !== id));
              dispatch(deleteCategory(id))
                .then(() => {
                  toast.success('Xóa danh mục thành công');
                })
                .catch(() => {
                  setVirtualData(oldData);
                  toast.error('Xóa danh mục thất bại');
                });
            }}
          >
            Xóa
          </Button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-white shadow-sm border-0',
        bodyClassName: 'p-0',
        progressClassName: 'bg-danger'
      }
    );
  };
  const handleSubmit = async (formData) => {
    try {
      if (currentCategory) {
        const updatedData = {
          ...currentCategory,
          ...formData,
          parent_id: formData.parent_id || null // Convert empty string to null
        };
    
        if (formData.parent_id && formData.parent_id !== currentCategory.parent_id) {
          const parent = parentCategories.find(p => p.id === formData.parent_id);
          updatedData.parent_name = parent ? parent.name : currentCategory.parent_name;
        }
    
        await dispatch(updateCategory({
          id: currentCategory.id,
          categoryData: updatedData
        }));
        
        // Force refresh by fetching latest data
        await dispatch(getCategories({
          page,
          limit,
          search: debouncedSearchTerm
        }));
        
        // Close modal after successful update
        setShowModal(false);
        setCurrentCategory(null);
        
        toast.success('Cập nhật danh mục thành công');
      } else {
        await dispatch(addCategory(formData));
        toast.success('Thêm danh mục thành công');
        fetchData(); // Refresh data
      }
    } catch (error) {
      toast.error('Thêm danh mục thất bại');
    }
  }; 
  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
            <p className="text-muted mb-0">Đang tải dữ liệu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="p-4">
        <Row className="mb-4 align-items-center">
          <Col>
            <h4 className="mb-1">Quản lý Danh mục</h4>
            <Breadcrumb className="mb-0">
              <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item href="/products">
                <FaBox className="me-1" />
                Sản phẩm
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Danh mục</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="search-box position-relative flex-grow-1 me-3">
                    <FaSearch className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm danh mục..."
                      className="ps-4"
                      style={{ borderRadius: '20px', maxWidth: '300px' }}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        navigate('/categories?page=1');
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-md-end gap-2">
                  <Button 
                    variant="light"
                    onClick={() => fetchData({ page: 1 })}
                    title="Làm mới dữ liệu"
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" />
                    Làm mới
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    Thêm mới
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <CategoryList 
          categories={virtualData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {pagination.totalPages > 1 && !loading && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination className="mb-0">
              <Pagination.First 
                onClick={() => handlePageChange(1)} 
                disabled={pagination.currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))} 
                disabled={pagination.currentPage === 1}
              />
              {[...Array(pagination.totalPages)].map((_, index) => (
                <Pagination.Item 
                  key={index + 1}
                  active={index + 1 === pagination.currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                disabled={pagination.currentPage === pagination.totalPages}
              />
              <Pagination.Last 
                onClick={() => handlePageChange(pagination.totalPages)} 
                disabled={pagination.currentPage === pagination.totalPages}
              />
            </Pagination>
          </div>
        )}
      </Container>
      <CategoryModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setCurrentCategory(null);
        }}
        handleSubmit={handleSubmit}
        category={currentCategory}
        isEditing={!!currentCategory}
        parentCategories={parentCategories} // Only pass once here
      />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
};

export default ProductCategory;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../store/Api/Category';
import Layout from '../components/layout/Layout';
import { Breadcrumb, Button, Col, Container, Form, Row, Pagination, ButtonGroup } from 'react-bootstrap';
import { FaSearch , FaBox  } from 'react-icons/fa';
import CategoryList from '../components/category/CategoryList';
import CategoryModal from '../components/category/CategoryModal';
import { toast , ToastContainer  } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CiRedo } from 'react-icons/ci';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;
  
  const { data, loading, error, pagination } = useSelector(state => ({
    data: state.category?.data || [],
    loading: state.category?.loading || false,
    error: state.category?.error || null,
    pagination: state.category?.pagination || {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 1
    }
  }));
  
  // Xóa phần useState pagination ở đây
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getCategories({
          page: 1,  // Reset về trang 1 khi tìm kiếm
          limit: limit,
          search: debouncedSearchTerm
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
    fetchData();
  }, [debouncedSearchTerm]);
  const [virtualData, setVirtualData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setVirtualData(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getCategories({
          page: page,  // Use page from URL params
          limit: limit, // Use limit from URL params
          search: debouncedSearchTerm
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

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, page, limit, debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    navigate(`/categories?page=${newPage}&limit=${limit}`); // Use limit from URL params
  };
  // Kiểm tra dữ liệu nhận được
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (category) => {
    // Lưu lại dữ liệu hiện tại để rollback nếu cần
    const currentData = [...virtualData];
    setCurrentCategory(category);
    setShowModal(true);
    
    // Thêm logic xử lý khi modal đóng mà không submit
    const handleModalClose = () => {
      setVirtualData(currentData); // Rollback nếu không submit
      setShowModal(false);
      setCurrentCategory(null);
    };
    
    return handleModalClose;
  }
  
  const handleDelete = (id) => {
    // Lưu dữ liệu cũ để rollback nếu cần
    const oldData = [...virtualData];
    
    toast.info(
      <div>
        <h6>Xác nhận xóa</h6>
        <p>Bạn có chắc muốn xóa danh mục này?</p>
        <div className="d-flex justify-content-end mt-3">
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2"
            onClick={() => toast.dismiss()}
          >
            Hủy
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              toast.dismiss();
              // Xóa ảo trước
              setVirtualData(prev => prev.filter(item => item.id !== id));
              dispatch(deleteCategory(id)).catch(() => {
                // Rollback nếu có lỗi
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
      }
    );
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentCategory) {
        // Lưu dữ liệu cũ để rollback
        const oldData = [...virtualData];
        
        // Cập nhật ảo ngay lập tức
        setVirtualData(prev => prev.map(item => 
          item.id === currentCategory.id ? {...item, ...formData} : item
        ));
        
        const action = await dispatch(updateCategory({ 
          id: currentCategory.id, 
          categoryData: formData 
        }));
        
        // Cập nhật lại từ server
        if (action.payload) {
          setVirtualData(prev => prev.map(item => 
            item.id === currentCategory.id ? action.payload : item
          ));
        }
        toast.success('Cập nhật thành công!');
      } else {
        const tempId = `temp_${Date.now()}`;
        const newItem = {id: tempId, ...formData, isVirtual: true};
        
        setVirtualData(prev => [...prev, newItem]);
        
        const action = await dispatch(addCategory(formData));
        
        if (action.payload) {
          setVirtualData(prev => prev.filter(item => item.id !== tempId).concat(action.payload));
        }
        toast.success('Thêm mới thành công!');
      }
      setShowModal(false);
      setCurrentCategory(null);
    } catch (error) {
      setVirtualData(data);
      toast.error('Lỗi: ' + (error.message || 'Vui lòng thử lại'));
    }
  };

  const refreshData = () => {
    dispatch(getCategories({
      page: page, // Sử dụng từ URL params
      limit: limit, // Sử dụng từ URL params
      search: debouncedSearchTerm
    }));
  };

  return (
    <Layout>

      <Container fluid className="p-4">
        <Breadcrumb
          title="Danh mục sản phẩm" 
          items={[
            { label: "Sản phẩm", icon: FaBox },
            { label: "Danh mục", active: true }
          ]}
        />
        <Row className="mb-4">
          <Col md={6}>
            <h3>Quản lý Danh mục</h3>
            <p className="text-muted">Tổng số: {Array.isArray(data) ? data.length : 0} danh mục</p>
          </Col>
          <Col md={6} className="text-end">
            <div className="d-flex justify-content-end align-items-center">
              <div className="position-relative me-2">
                
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm danh mục..."
                  className="ps-4"
                  style={{ width: '250px', borderRadius: '20px' }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    navigate('/categories?page=1'); // Reset về trang 1 khi tìm kiếm
                  }}
                />
              
              </div>
              <ButtonGroup>
                <Button 
                  variant="outline-secondary" 
                  onClick={refreshData}
                  title="Làm mới dữ liệu"
                >
                 <CiRedo />
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => setShowModal(true)}
                  title="Thêm danh mục mới"
                >
                  Thêm mới
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            <CategoryList 
              categories={virtualData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchTerm={searchTerm} // Thêm prop searchTerm
            />
            {pagination.totalPages > 1 && !loading && (
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)} 
                    disabled={pagination.currentPage === 1 || loading}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))} 
                    disabled={pagination.currentPage === 1 || loading}
                  />
                  {[...Array(pagination.totalPages).keys()].map(number => (
                    <Pagination.Item 
                      key={number + 1}
                      active={number + 1 === pagination.currentPage}
                      onClick={() => handlePageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                    disabled={pagination.currentPage === pagination.totalPages || loading}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(pagination.totalPages)} 
                    disabled={pagination.currentPage === pagination.totalPages || loading}
                  />
                </Pagination>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <CategoryModal
        show={showModal}
        handleClose={() => {
          setVirtualData(data); // Reset về dữ liệu gốc
          setShowModal(false);
          setCurrentCategory(null);
        }}
        handleSubmit={handleSubmit}
        category={currentCategory || {}}
        isEditing={!!currentCategory}
      />
       <ToastContainer    
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default ProductCategory;

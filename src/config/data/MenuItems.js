import { FaHome, FaUsers, FaShoppingCart, FaClipboardList, FaChartBar, FaCog, FaInfoCircle } from 'react-icons/fa';

const menuItems = [
  {
    path: "/home",
    name: "Trang chủ",
    icon: { component: FaHome, size: 16 }
  },
  {
    path: "/categories",
    name: "Danh mục sản phẩm",
    icon: { component: FaClipboardList, size: 16 }
  },
  {
    path: "/users",
    name: "Người dùng",
    icon: { component: FaUsers, size: 16 }
  },
  {
    path: "/orders",
    name: "Đơn hàng",
    icon: { component: FaShoppingCart, size: 16 }
  },
  {
    path: "/products",
    name: "Sản phẩm",
    icon: { component: FaClipboardList, size: 16 }
  },
  {
    path: "/product-intros",
    name: "Giới thiệu sản phẩm", 
    icon: { component: FaInfoCircle, size: 16 }
  },
  {
    path: "/analytics",
    name: "Thống kê",
    icon: { component: FaChartBar, size: 16 }
  },
  {
    path: "/settings",
    name: "Cài đặt",
    icon: { component: FaCog, size: 16 }
  }
];

export default menuItems;
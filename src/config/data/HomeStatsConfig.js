import { 
  FaShoppingCart, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartLine 
} from 'react-icons/fa';

const stats = [
  {
    title: 'Tổng đơn hàng',
    value: '1,234',
    icon: { component: FaShoppingCart, size: 16 },
    color: '#0d6efd'
  },
  {
    title: 'Khách hàng',
    value: '856',
    icon: { component: FaUsers, size: 16 },
    color: '#198754'
  },
  {
    title: 'Doanh thu',
    value: '45.6M',
    icon: { component: FaMoneyBillWave, size: 16 },
    color: '#dc3545'
  },
  {
    title: 'Tăng trưởng',
    value: '+12.5%',
    icon: { component: FaChartLine, size: 16 },
    color: '#6f42c1'
  }
];

export default stats;
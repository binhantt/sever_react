import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/Slice/Login';
import axios from 'axios';
import ApiConfig from '../config/Api.config';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post(`${ApiConfig.severAdmin}${ApiConfig.logout}`);
            } finally {
                dispatch(logout());
                navigate('/');
            }
        };
        performLogout();
    }, [dispatch, navigate]);

    return <div>Đang đăng xuất...</div>;
};

export default Logout;
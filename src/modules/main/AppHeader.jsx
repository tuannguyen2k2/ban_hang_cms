/* eslint-disable react/prop-types */
import { Header } from 'antd/es/layout/layout';
import styles from './AppHeader.module.scss';
import { IoLogOutOutline } from 'react-icons/io5';
import {
    DownOutlined,
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TranslationOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import locales from '../../locales';
import { removeCacheAccessToken } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice/accountSlice';
const AppHeader = ({ collapsed, onCollapse }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        removeCacheAccessToken();
        dispatch(logout());
    };
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <button className={styles.iconCollapse} onClick={onCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#ccc' }}>HỆ THỐNG QUẢN LÝ CỦA QUẢN TRỊ VIÊN</span>
            <button className={styles.logout} onClick={handleLogout}>
                <span style={{ marginRight: '8px' }}>{locales.logout}</span>
                <IoLogOutOutline size={30} />
            </button>
        </Header>
    );
};

export default AppHeader;

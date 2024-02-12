/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import NavSider from './NavSider';
import AppHeader from './AppHeader';
import { useState } from 'react';
import locales from '../../locales';
const SIDEBAR_WIDTH_EXPAND = 320;
const MainLayout = ({ children }) => {
    const { Content, Footer } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed((prev) => !prev);
    return (
        <Layout>
            <NavSider collapsed={collapsed} onCollapse={toggleCollapsed} width={SIDEBAR_WIDTH_EXPAND} />
            <Layout>
                <AppHeader collapsed={collapsed} onCollapse={toggleCollapsed} />
                <Content>
                    <div style={{ minHeight: 'calc(100vh - 113px)' }}>{children}</div>
                    <Footer style={{ backgroundColor: '#ccc', textAlign: 'center', padding: '15px' }}>
                        <span>{locales.footer}</span>
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

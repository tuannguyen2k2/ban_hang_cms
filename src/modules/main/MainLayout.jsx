/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import NavSider from './NavSider';
import AppHeader from './AppHeader';
import { useState } from 'react';
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
                    <div>{children}</div>
                    <Footer style={{ backgroundColor: '#ccc' }}></Footer>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

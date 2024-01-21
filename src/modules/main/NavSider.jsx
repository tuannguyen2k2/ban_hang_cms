/* eslint-disable react/prop-types */
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import navMenuConfig from '../../constants/menuConfig';

const NavSider = ({ collapsed, onCollapse, width }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const activeNav = useMemo(() => {
        const activeNav = findActiveNav(navMenuConfig);

        if (activeNav) {
            return activeNav;
        }

        return {
            selectedKeys: [],
            openKeys: [],
        };
    }, [location.pathname]);

    function findActiveNav(navs) {
        for (const nav of navs) {
            if (nav.children) {
                const activeItem = findActiveNav(nav.children);
                if (activeItem) {
                    return {
                        selectedKeys: activeItem.selectedKeys,
                        openKeys: [nav.key, ...activeItem.openKeys],
                    };
                }
            } else if (matchPath(nav.path + '/*', location.pathname)) {
                return {
                    selectedKeys: [nav.key],
                    openKeys: [],
                };
            }
        }

        // return defaultOpenNav;
    }

    function handleMenuItemClick(item) {
        let selectedNav;
        navMenuConfig.forEach((navItem) => {
            if (navItem.key === item.key) selectedNav = navItem;
            else if (navItem.children) {
                navItem.children.map((navChild) => {
                    if (navChild.key === item.key) selectedNav = navChild;
                });
            }
        });

        navigate(selectedNav?.path);
    }

    return (
        <Sider
            style={{ height: 'calc(100vh - 48px - 64px)' }}
            collapsible
            collapsed={collapsed}
            width={width}
            onCollapse={onCollapse}
            trigger={null}
        >
            <Menu
                key={location.pathname == '/' ? 'initial' : 'navSider'}
                theme='light'
                mode='inline'
                defaultSelectedKeys={activeNav.selectedKeys}
                defaultOpenKeys={activeNav.openKeys}
                selectedKeys={activeNav.selectedKeys}
                items={navMenuConfig}
                onSelect={(item) => handleMenuItemClick(item)}
            />
        </Sider>
    );
};

export default NavSider;

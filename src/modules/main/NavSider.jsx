/* eslint-disable react/prop-types */
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import navMenuConfig from '../../constants/menuConfig';
import styles from './NavSider.module.scss';
import banner from '/public/banner.png';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Sider collapsible collapsed={collapsed} width={width} onCollapse={onCollapse} trigger={null}>
            <div data-collapsed={collapsed} className={styles.logo} style={{ width: '100%' }}>
                <img src={banner} alt='Mira' />
            </div>
            <Menu
                key={location.pathname == '/' ? 'initial' : 'navSider'}
                theme='dark'
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

/* eslint-disable react/prop-types */

import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { accessRouteTypeEnum } from '../constants';
import routes from '.';
import MainLayout from '../modules/main/MainLayout';
import PublicLayout from '../modules/main/PublicLayout';

const ValidateAccess = ({
    authRequire,
    component: Component,
    componentProps,
    isAuthenticated,
    layout,
    pageOptions,
}) => {
    const location = useLocation();
    const getRedirect = (authRequire) => {
        if (authRequire === accessRouteTypeEnum.NOT_LOGIN && isAuthenticated) {
            return routes.homePage.path;
        }

        if (authRequire === accessRouteTypeEnum.REQUIRE_LOGIN && !isAuthenticated) {
            return routes.signInPage.path;
        }

        return false;
    };

    const redirect = getRedirect(authRequire);

    if (redirect) {
        return <Navigate state={{ from: location }} key={redirect} to={redirect} replace />;
    }

    const Layout = authRequire ? layout || MainLayout : PublicLayout;
    return (
        <Layout>
            <Component pageOptions={pageOptions} {...(componentProps || {})}>
                <Outlet />
            </Component>
        </Layout>
    );
};

export default ValidateAccess;

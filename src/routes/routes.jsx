import { Routes, BrowserRouter, Route, Outlet } from 'react-router-dom';

import AppNavigate from '../modules/main/AppNavigate';

import routes from '.';
import MainLayout from '../modules/main/MainLayout';
import ValidateAccess from './ValidateAccess';
import Loading from '../components/form/loading';
import useAuth from '../hooks/useAuth';

const routesArray = Object.values(routes);

const AppRoutes = () => {
    const { isAuthenticated, loading: loadingProfile } = useAuth();
    const renderRoute = (route) => {
        return (
            <Route
                key={route.path || 'not-found'}
                path={route.path}
                index={route.index}
                element={
                    loadingProfile ? (
                        <Loading show />
                    ) : (
                        <ValidateAccess
                            authRequire={route.auth}
                            component={route.component}
                            componentProps={route.componentProps}
                            isAuthenticated={isAuthenticated}
                            layout={route.layout}
                            path={route.path}
                            pageOptions={route.pageOptions}
                        />
                    )
                }
            />
        );
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppNavigate />}>{routesArray.map(renderRoute)}</Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

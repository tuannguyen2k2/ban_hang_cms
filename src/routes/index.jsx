import HomePage from '../modules/home';
import categoryRoutes from '../modules/category/routes';
import productRoutes from '../modules/product/routes';
import kindRoutes from '../modules/kind/routes';
const routes = {
    homePage: {
        path: '/',
        component: HomePage,
    },
    ...categoryRoutes,
    ...productRoutes,
    ...kindRoutes,
};
export default routes;

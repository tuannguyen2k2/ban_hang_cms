import HomePage from '../modules/home';
import categoryRoutes from '../modules/category/routes';
import productRoutes from '../modules/product/routes';
import kindRoutes from '../modules/kind/routes';
import SignInPage from '../modules/signIn';
const routes = {
    homePage: {
        path: '/',
        auth: true,
        component: HomePage,
    },
    signInPage: {
        path: '/sign-in',
        auth: false,
        component: SignInPage,
    },
    ...categoryRoutes,
    ...productRoutes,
    ...kindRoutes,
};
export default routes;

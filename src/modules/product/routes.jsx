import ProductListPage from '.';
import ProductSavePage from './ProductSavePage';

export default {
    productListPage: {
        path: '/category/kind/product',
        component: ProductListPage,
        auth: true,
    },
    productSavePage: {
        path: '/category/kind/product/:id',
        component: ProductSavePage,
        auth: true,
    },
};

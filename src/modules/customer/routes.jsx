import CustomerListPage from '.';
import CustomerSavePage from './CustomerSavePage';

export default {
    customerListPage: {
        path: '/customer',
        component: CustomerListPage,
        auth: true,
    },
    customerSavePage: {
        path: '/customer/:id',
        component: CustomerSavePage,
        auth: true,
    },
};

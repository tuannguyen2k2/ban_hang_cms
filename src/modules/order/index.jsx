import { DevelopingPage } from '../../components/pages/DevelopingPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
const OrderListPage = () => {
    const breadcrumbs = [
        {
            breadcrumbName: locales.order,
        },
    ];

    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <DevelopingPage />
        </PageWrapper>
    );
};

export default OrderListPage;

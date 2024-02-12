import { DevelopingPage } from '../../components/pages/DevelopingPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
const AnalyticListPage = () => {
    const breadcrumbs = [
        {
            breadcrumbName: locales.analytic,
        },
    ];

    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <DevelopingPage />
        </PageWrapper>
    );
};

export default AnalyticListPage;

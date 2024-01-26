import BaseTable from '../../components/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '../../constants';
import apiConfig from '../../constants/apiConfig';
import useListBase from '../../hooks/useListBase';
import ListPage from '../../layouts/ListPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import routes from '../../routes';
import { convertIsoToLocalTime } from '../../utils/formatDate';

const ProductListPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryName = searchParams.get('categoryName');
    const categoryId = searchParams.get('categoryId');
    const kindName = searchParams.get('kindName');
    const kindId = searchParams.get('kindId');
    const { data, loading, mixinFuncs, pagination } = useListBase({
        apiConfig: apiConfig.product,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.product,
        },
        override: (funcs) => {
            funcs.getCreateLink = () => {
                return `${routes.productListPage.path}/create?kindId=${kindId}&kindName=${kindName}&categoryId=${categoryId}&categoryName=${categoryName}`;
            };
            funcs.getItemDetailLink = (dataRow) => {
                return `${routes.productListPage.path}/${dataRow._id}?kindId=${kindId}&kindName=${kindName}&categoryId=${categoryId}&categoryName=${categoryName}`;
            };
        },
    });

    const breadcrumbs = [
        {
            breadcrumbName: locales.category,
            path: routes.categoryListPage.path,
        },
        {
            breadcrumbName: locales.kind,
            path: routes.kindListPage.path + `?categoryId=${categoryId}&categoryName=${categoryName}`,
        },
        {
            breadcrumbName: locales.product,
        },
    ];
    const columns = [
        {
            title: locales.name,
            dataIndex: 'name',
        },
        {
            title: locales.createdAt,
            dataIndex: 'createdAt',
            render: (createdAt) => {
                return convertIsoToLocalTime(createdAt);
            },
        },
        {
            title: locales.updatedAt,
            dataIndex: 'updatedAt',
            render: (updatedAt) => {
                return convertIsoToLocalTime(updatedAt);
            },
        },
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '150px' }),
    ];
    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <ListPage
                title={kindName}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        onChange={mixinFuncs.changePagination}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default ProductListPage;

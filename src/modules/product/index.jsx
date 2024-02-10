import { UserOutlined } from '@ant-design/icons';
import AvatarField from '../../components/form/AvatarField';
import BaseTable from '../../components/table/BaseTable';
import { CURRENCY_UNIT, DEFAULT_TABLE_ITEM_SIZE } from '../../constants';
import apiConfig from '../../constants/apiConfig';
import useListBase from '../../hooks/useListBase';
import ListPage from '../../layouts/ListPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import routes from '../../routes';
import { convertIsoToLocalTime } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';
const ProductListPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryName = searchParams.get('categoryName');
    const categoryId = searchParams.get('categoryId');
    const kindName = searchParams.get('kindName');
    const kindId = searchParams.get('kindId');
    const { data, loading, mixinFuncs, pagination, setQueryParams, serializeParams } = useListBase({
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
            funcs.changeFilter = (filter) => {
                setQueryParams(serializeParams({ kindId, kindName, categoryId, categoryName, ...filter }));
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
            title: '#',
            dataIndex: 'image',
            align: 'center',
            width: 80,
            render: (image) => (
                <AvatarField size='large' icon={<UserOutlined />} src={image[0] ? image[0]?.url : null} />
            ),
        },
        {
            title: locales.nameProduct,
            dataIndex: 'name',
        },
        {
            title: locales.quantity,
            align: 'center',
            dataIndex: 'quantity',
        },
        {
            title: locales.price,
            dataIndex: 'price',
            width: 150,
            align: 'right',
            render: (price) => {
                const formattedValue = formatMoney(price, {
                    currency: CURRENCY_UNIT,
                    currentDecimal: '0',
                    groupSeparator: ',',
                });
                return <div>{formattedValue}</div>;
            },
        },
        {
            title: locales.createdAt,
            align: 'center',
            dataIndex: 'createdAt',
            render: (createdAt) => {
                return convertIsoToLocalTime(createdAt);
            },
        },

        {
            title: locales.updatedAt,
            align: 'center',
            dataIndex: 'updatedAt',
            render: (updatedAt) => {
                return convertIsoToLocalTime(updatedAt);
            },
        },
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '150px' }),
    ];
    const searchFields = [
        {
            key: 'name',
            placeholder: locales.nameProduct,
        },
    ];

    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <ListPage
                title={kindName}
                actionBar={mixinFuncs.renderActionBar()}
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                })}
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

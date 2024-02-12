import { useNavigate } from 'react-router-dom';
import BaseTable from '../../components/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '../../constants';
import apiConfig from '../../constants/apiConfig';
import useListBase from '../../hooks/useListBase';
import ListPage from '../../layouts/ListPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import { convertIsoToLocalTime } from '../../utils/formatDate';
import routes from '../../routes';
const CustomerListPage = () => {
    const { data, loading, mixinFuncs, pagination } = useListBase({
        apiConfig: apiConfig.user,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.customer,
        },
        override: (funcs) => {
            funcs.getCreateLink = () => {
                return `${routes.customerListPage.path}/create`;
            };
            funcs.getItemDetailLink = (dataRow) => {
                return `${routes.customerListPage.path}/${dataRow._id}`;
            };
            const prepareGetListParams = funcs.prepareGetListParams;
            funcs.prepareGetListParams = (params) => {
                return {
                    ...prepareGetListParams(params),
                    role: 'USER',
                };
            };
        },
    });

    const breadcrumbs = [
        {
            breadcrumbName: locales.customer,
        },
    ];
    const columns = [
        {
            title: locales.nameCustomer,
            dataIndex: 'name',
        },
        {
            title: locales.phone,
            dataIndex: 'phone',
        },
        {
            title: locales.email,
            dataIndex: 'email',
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
        mixinFuncs.renderActionColumn({ edit: true }, { width: '150px' }),
    ];
    const searchFields = [
        {
            key: 'name',
            placeholder: locales.nameCustomer,
        },
    ];
    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <ListPage
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

export default CustomerListPage;

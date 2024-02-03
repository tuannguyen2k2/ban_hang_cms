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
import KindModal from './KindModal';

const KindListPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryName = searchParams.get('categoryName');
    const categoryId = searchParams.get('categoryId');
    const {
        data,
        loading,
        mixinFuncs,
        pagination,
        openModal,
        isEditing,
        dataRowSelected,
        serializeParams,
        setQueryParams,
    } = useListBase({
        apiConfig: apiConfig.kind,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.kind,
            hasModal: true,
        },
        override: (funcs) => {
            funcs.changeFilter = (filter) => {
                setQueryParams(serializeParams({ categoryId, categoryName, ...filter }));
            };
        },
    });

    const navigate = useNavigate();

    const breadcrumbs = [
        {
            breadcrumbName: locales.category,
            path: routes.categoryListPage.path,
        },
        {
            breadcrumbName: locales.kind,
        },
    ];
    const columns = [
        {
            title: locales.nameKind,
            dataIndex: 'name',
            render: (name, dataRow) => {
                return (
                    <button
                        className='textNavigate'
                        onClick={() => {
                            navigate(
                                routes.productListPage.path +
                                    `?kindId=${dataRow?._id}&kindName=${dataRow?.name}&categoryId=${categoryId}&categoryName=${categoryName}`
                            );
                        }}
                    >
                        {name.toUpperCase()}
                    </button>
                );
            },
        },
        {
            title: locales.createdAt,
            dataIndex: 'createdAt',
            align: 'center',
            render: (createdAt) => {
                return convertIsoToLocalTime(createdAt);
            },
        },
        {
            title: locales.updatedAt,
            dataIndex: 'updatedAt',
            align: 'center',
            render: (updatedAt) => {
                return convertIsoToLocalTime(updatedAt);
            },
        },
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '150px' }),
    ];
    const searchFields = [
        {
            key: 'name',
            placeholder: locales.nameKind,
        },
    ];
    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <ListPage
                title={categoryName.toUpperCase()}
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
            <KindModal
                dataRowSelected={dataRowSelected}
                isEditing={isEditing}
                openModal={openModal}
                setOpenModal={mixinFuncs.setOpenModal}
                setIsEditing={mixinFuncs.setIsEditing}
                getList={mixinFuncs.getList}
            />
        </PageWrapper>
    );
};

export default KindListPage;

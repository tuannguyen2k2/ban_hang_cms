import { useNavigate } from 'react-router-dom';
import BaseTable from '../../components/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '../../constants';
import apiConfig from '../../constants/apiConfig';
import useListBase from '../../hooks/useListBase';
import ListPage from '../../layouts/ListPage';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import { convertIsoToLocalTime } from '../../utils/formatDate';
import CategoryModal from './CategoryModal';
import routes from '../../routes';
const CategoryListPage = () => {
    const { data, loading, mixinFuncs, pagination, openModal, isEditing, dataRowSelected } = useListBase({
        apiConfig: apiConfig.category,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.category,
            hasModal: true,
        },
    });

    const navigate = useNavigate();

    const breadcrumbs = [
        {
            breadcrumbName: locales.category,
        },
    ];
    const columns = [
        {
            title: locales.name,
            dataIndex: 'name',
            render: (name, dataRow) => {
                return (
                    <button
                        className='textNavigate'
                        onClick={() => {
                            navigate(
                                routes.kindListPage.path + `?categoryId=${dataRow?._id}&categoryName=${dataRow?.name}`
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
            <CategoryModal
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

export default CategoryListPage;

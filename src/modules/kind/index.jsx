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
    const { data, loading, mixinFuncs, pagination, openModal, isEditing, dataRowSelected } = useListBase({
        apiConfig: apiConfig.kind,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.kind,
            hasModal: true,
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
                title={categoryName}
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

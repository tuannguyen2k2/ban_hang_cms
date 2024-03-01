import { Button } from 'antd';
import AvatarField from '../../components/form/AvatarField';
import BaseTable from '../../components/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '../../constants';
import apiConfig from '../../constants/apiConfig';
import useListBase from '../../hooks/useListBase';
import ListPage from '../../layouts/ListPage';
import locales from '../../locales';
import BannerModel from './BannerModal';
import { DeleteOutlined } from '@ant-design/icons';
import useFetch from '../../hooks/useFetch';

const SettingPage = () => {
    const { execute: executeUpdateSetting } = useFetch(apiConfig.setting.update);
    const { data, loading, mixinFuncs, pagination, openModal, isEditing, dataRowSelected } = useListBase({
        apiConfig: apiConfig.setting,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: locales.banner,
            hasModal: true,
        },
        override: (funcs) => {
            funcs.additionalActionColumnButtons = () => ({
                delete: (record) => (
                    <Button
                        type='link'
                        style={{ padding: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const newListBanner = data[0]?.banner.filter((item) => item?.url != record?.url);
                            executeUpdateSetting({
                                pathParams: {
                                    id: data[0]?._id,
                                },
                                data: {
                                    banner: newListBanner,
                                },
                                onCompleted: () => {
                                    mixinFuncs.getList();
                                },
                            });
                        }}
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Button>
                ),
            });
        },
    });
    const columns = [
        {
            title: '#',
            align: 'center',
            dataIndex: 'url',
            width: 80,
            render: (image) => {
                return (
                    <AvatarField style={{ width: '80%', height: '220px' }} size='large' shape='square' src={image} />
                );
            },
        },
        mixinFuncs.renderActionColumn({ delete: true }, { width: '100px' }),
    ];
    return (
        <>
            <ListPage
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 0 10px' }}>
                        <span>{locales.banner}</span>
                        <Button type='primary' onClick={() => mixinFuncs.setOpenModal(true)}>
                            +
                        </Button>
                    </div>
                }
                baseTable={
                    <BaseTable
                        columns={columns}
                        dataSource={data[0]?.banner}
                        loading={loading}
                        onChange={mixinFuncs.changePagination}
                        pagination={pagination}
                    />
                }
            />
            <BannerModel
                data={data}
                openModal={openModal}
                setOpenModal={mixinFuncs.setOpenModal}
                getList={mixinFuncs.getList}
                executeUpdateSetting={executeUpdateSetting}
            />
        </>
    );
};

export default SettingPage;

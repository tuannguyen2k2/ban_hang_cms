import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Modal } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseTooltip from '../components/form/BaseTooltip';
import { DEFAULT_TABLE_ITEM_SIZE, DEFAULT_TABLE_PAGE_START } from '../constants';
import useFetch from './useFetch';
import useNotification from './useNotification';
import useQueryParams from './useQueryParams';
import locales from '../locales';
import ActionBar from '../components/elements/ActionBar';
import SearchForm from '../components/form/SearchForm';

const useListBase = ({
    apiConfig = {
        getList: null,
        delete: null,
        create: null,
        update: null,
        getById: null,
    },
    options = {
        objectName: '',
        pageSize: DEFAULT_TABLE_ITEM_SIZE,
        paramsHolder: {},
        hasModal: false,
    },
    override,
} = {}) => {
    const { params: queryParams, setQueryParams, serializeParams, deserializeParams } = useQueryParams();
    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(false);
    const { execute: executeGetList } = useFetch(apiConfig.getList);
    const { execute: executeDelete } = useFetch(apiConfig.delete);
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [dataRowSelected, setDataRowSelected] = useState();
    const location = useLocation();
    const { listData } = location.state ?? {};
    const [pagination, setPagination] = useState(
        listData
            ? listData.pagination
            : {
                  pageSize: options.pageSize,
                  total: 0,
                  current: 1,
              }
    );
    const notification = useNotification();
    const { pathname: pagePath } = useLocation();
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const queryFilter = useMemo(() => deserializeParams(queryParams), [queryParams]);
    const mappingData = (response) => {
        return {
            data: response.data.content,
            total: response.data.totalElements,
        };
    };
    const handleGetListError = () => {
        notification({ type: 'error', message: locales.getListFail });
    };

    const onCompletedGetList = (response) => {
        const { data, total } = mixinFuncs.mappingData(response);

        setData(data);
        setPagination((p) => ({ ...p, total }));
    };

    const prepareGetListPathParams = () => {
        return {};
    };
    const handleFetchList = (params, isReload) => {
        if (!apiConfig.getList) throw new Error(locales.apiGetListNotFound);
        if (listData && !isReload) {
            setData(listData.data);
            setPagination(listData.pagination);
        } else {
            setLoading(true);
            executeGetList({
                pathParams: mixinFuncs.prepareGetListPathParams(),
                params,
                onCompleted: (response) => {
                    mixinFuncs.onCompletedGetList(response);
                    setLoading(false);
                },
                onError: (error) => {
                    mixinFuncs.handleGetListError(error);
                    setLoading(false);
                },
            });
        }
    };

    const prepareGetListParams = (filter) => {
        const copyFilter = { ...filter };

        const page = parseInt(queryParams.get('page'));
        copyFilter.page = page || DEFAULT_TABLE_PAGE_START;

        copyFilter.pageSize = options.pageSize;

        return copyFilter;
    };
    const getList = (isReload = false) => {
        const params = mixinFuncs.prepareGetListParams(queryFilter);

        mixinFuncs.handleFetchList({ ...params }, isReload);
    };

    const changeFilter = (filter) => {
        setQueryParams(serializeParams(filter));
    };

    function changePagination(page) {
        queryParams.set('page', page.current);
        setQueryParams(queryParams);
    }
    const handleDeleteItemError = (error) => {
        console.log(error);
        notification({
            type: 'error',
            message: locales.deleteFail.replace('${objectName}', options.objectName.toLowerCase()),
        });
    };

    const onDeleteItemCompleted = () => {
        const currentPage = queryParams.get('page');
        if (data.length === 1 && currentPage > 1) {
            queryParams.set('page', currentPage - 1);
            setQueryParams(queryParams);
        } else {
            mixinFuncs.getList(true);
        }
    };

    const handleDeleteItem = (id) => {
        setLoading(true);
        executeDelete({
            pathParams: { id },
            onCompleted: () => {
                mixinFuncs.onDeleteItemCompleted();

                notification({
                    type: 'success',
                    message: locales.deleteSuccess.replace('${objectName}', options.objectName.toLowerCase()),
                });
            },
            onError: (error) => {
                mixinFuncs.handleDeleteItemError(error);
                setLoading(false);
            },
        });
    };

    const showDeleteItemConfirm = (id) => {
        if (!apiConfig.delete) throw new Error(locales.apiDeleteNotFound);

        Modal.confirm({
            title: locales.confirmDelete.replace('${objectName}', options.objectName.toLowerCase()),
            content: '',
            okText: locales.yes,
            cancelText: locales.no,
            centered: true,
            onOk: () => {
                mixinFuncs.handleDeleteItem(id);
            },
        });
    };

    const actionColumnButtons = (additionalButtons = {}) => ({
        delete: ({ _id, buttonProps }) => {
            return (
                <BaseTooltip type='delete' objectName={options.objectName}>
                    <Button
                        {...buttonProps}
                        type='link'
                        onClick={(e) => {
                            e.stopPropagation();
                            mixinFuncs.showDeleteItemConfirm(_id);
                        }}
                        style={{ padding: 0 }}
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Button>
                </BaseTooltip>
            );
        },

        edit: ({ buttonProps, ...dataRow }) => {
            return (
                <BaseTooltip type={'edit'} objectName={options.objectName}>
                    <Button
                        {...buttonProps}
                        onClick={(e) => {
                            if (options.hasModal) {
                                setOpenModal(true);
                                setIsEditing(true);
                                setDataRowSelected(dataRow);
                            } else {
                                e.stopPropagation();
                                navigate(`${mixinFuncs.getItemDetailLink(dataRow)}`, {
                                    state: {
                                        action: 'edit',
                                        prevPath: location.pathname,
                                        listData: getListData,
                                    },
                                });
                            }
                        }}
                        type='link'
                        style={{ padding: 0 }}
                    >
                        {<EditOutlined color='red' />}
                    </Button>
                </BaseTooltip>
            );
        },
        ...additionalButtons,
    });
    const additionalActionColumnButtons = () => {
        return {};
    };

    const createActionColumnButtons = (actions, data) => {
        const actionButtons = [];
        const buttons = actionColumnButtons(mixinFuncs.additionalActionColumnButtons());

        Object.entries(actions).forEach(([key, value]) => {
            let _value = value;
            if (typeof value === 'function') {
                _value = value(data);
            }
            if (_value && buttons[key]) {
                actionButtons.push(buttons[key]);
            }
        });

        return actionButtons;
    };
    const renderActionColumn = (action = { edit: false, delete: false }, columnsProps, buttonProps) => {
        return {
            align: 'center',
            ...columnsProps,
            title: locales.action,
            render: (data) => {
                const buttons = [];
                const actionButtons = mixinFuncs.createActionColumnButtons(action, data);
                actionButtons.forEach((ActionItem) => {
                    if (ActionItem({ ...data, ...buttonProps })) {
                        buttons.push(ActionItem);
                    }
                });

                return (
                    <span>
                        {buttons.map((ActionItem, index) => (
                            <React.Fragment key={ActionItem}>
                                {index > 0 && <Divider type='vertical' />}
                                <span>
                                    {ActionItem({ ...data, ...buttonProps }) ? (
                                        <ActionItem {...data} {...buttonProps} />
                                    ) : null}
                                </span>
                            </React.Fragment>
                        ))}
                    </span>
                );
            },
        };
    };
    const getListData = useMemo(() => {
        return {
            data,
            pagination,
        };
    }, [data, pagination]);
    const handleFilterSearchChange = (values) => {
        mixinFuncs.changeFilter(values);
    };
    const getItemDetailLink = (dataRow) => {
        return `${pagePath}/${dataRow._id}`;
    };

    const getCreateLink = () => {
        return `${pagePath}/create`;
    };
    const renderActionBar = ({ type, style, buttons } = {}) => {
        return (
            <ActionBar
                buttons={buttons}
                createLink={mixinFuncs.getCreateLink()}
                location={location}
                type={type}
                style={style}
                modal={options.hasModal}
                setOpenModal={setOpenModal}
            />
        );
    };
    const renderSearchForm = ({
        fields = [],
        getFormInstance,
        hiddenAction,
        className,
        initialValues,
        onSearch,
        onReset,
        alignSearchField = 'left',
        activeTab,
    }) => {
        return (
            <SearchForm
                activeTab={activeTab}
                getFormInstance={getFormInstance}
                alignSearchField={alignSearchField}
                fields={fields}
                initialValues={initialValues}
                onSearch={(values) => {
                    mixinFuncs.handleFilterSearchChange(values);
                    onSearch?.(values);
                }}
                hiddenAction={hiddenAction}
                className={className}
                onReset={() => {
                    mixinFuncs.changeFilter({});
                    onReset?.();
                }}
            />
        );
    };

    useEffect(() => {
        mixinFuncs.getList();
        const page = parseInt(queryFilter.page);
        if (page > 1 && page !== pagination.current) {
            setPagination((p) => ({ ...p, current: page }));
        } else if (page <= 1 || isNaN(page)) {
            setPagination((p) => ({ ...p, current: 1 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams, pagePath]);

    const overrideHandler = () => {
        const centralizedHandler = {
            mappingData,
            handleGetListError,
            handleFetchList,
            prepareGetListParams,
            getList,
            changeFilter,
            changePagination,
            createActionColumnButtons,
            onCompletedGetList,
            handleFilterSearchChange,
            prepareGetListPathParams,
            setQueryParams,
            renderActionColumn,
            additionalActionColumnButtons,
            handleDeleteItem,
            handleDeleteItemError,
            showDeleteItemConfirm,
            onDeleteItemCompleted,
            renderActionBar,
            getItemDetailLink,
            getCreateLink,
            setOpenModal,
            setIsEditing,
            renderSearchForm,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();

    return {
        dataRowSelected,
        isEditing,
        loading,
        data,
        setData,
        queryFilter,
        changeFilter,
        changePagination,
        pagination,
        mixinFuncs,
        getList,
        setLoading,
        pagePath,
        serializeParams,
        queryParams,
        setQueryParams,
        openModal,
    };
};

export default useListBase;

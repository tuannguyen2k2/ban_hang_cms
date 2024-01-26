import { useEffect, useState } from 'react';
import locales from '../locales';
import useFetch from './useFetch';
import useNotification from './useNotification';
import { Button, Col, Modal, Row } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const useModalBase = ({
    apiConfig = {
        getById: null,
        create: null,
        update: null,
    },
    options = {
        objectName: '',
        isEditing: false,
        dataRowSelected: {},
    },
    override,
    getList,
    getFuncOnBack,
}) => {
    const { execute: executeGet, loading } = useFetch(apiConfig.getById, {
        immediate: false,
    });
    const { execute: executeCreate } = useFetch(apiConfig.create, {
        immediate: false,
    });
    const { execute: executeUpdate } = useFetch(apiConfig.update, {
        immediate: false,
    });
    const id = options?.dataRowSelected?._id;
    const [isChanged, setIsChanged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [detail, setDetail] = useState({});
    const location = useLocation();
    const title = locales.titleAction
        .replace('${action}', options.isEditing ? locales.edit : locales.add)
        .replace('${objectName}', options.objectName.toLowerCase());
    const notification = useNotification();

    const mappingData = (response) => {
        if (response.result === true) return response.data;
    };
    const getFormId = () => {
        return `form-${location.pathname}`;
    };

    const handleFetchDetail = (params) => {
        executeGet({
            ...params,
            pathParams: { id: id },
            onCompleted: (response) => {
                setDetail(mixinFuncs.mappingData(response));
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    };

    const getDetail = () => {
        mixinFuncs.handleFetchDetail(id);
    };
    const prepareCreateData = (data) => {
        return data;
    };

    const prepareUpdateData = (data) => {
        return {
            ...data,
            id: id,
        };
    };

    const onSave = (values, callback) => {
        setIsSubmitting(true);
        if (options.isEditing) {
            executeUpdate({
                pathParams: { id: id },
                data: mixinFuncs.prepareUpdateData(values),
                onCompleted: mixinFuncs.onSaveCompleted,
                onError: (err) => mixinFuncs.onSaveError(err, callback),
            });
        } else {
            executeCreate({
                data: mixinFuncs.prepareCreateData(values),
                onCompleted: mixinFuncs.onSaveCompleted,
                onError: (err) => mixinFuncs.onSaveError(err, callback),
            });
        }
    };

    const onSaveCompleted = (responseData) => {
        setIsSubmitting(false);
        if (responseData?.data?.errors?.length) {
            mixinFuncs.onSaveError();
        } else {
            if (options.isEditing) {
                mixinFuncs.onUpdateCompleted(responseData);
            } else {
                mixinFuncs.onInsertCompleted(responseData);
            }
            getList();
        }
    };

    const getActionName = () => {
        return options.isEditing ? locales.update : locales.addNew;
    };

    const onUpdateCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: locales.updateSuccess.replace('${objectName}', options.objectName.toLowerCase()),
            });
            mixinFuncs.onBack();
        }
    };

    const onInsertCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: locales.createSuccess.replace('${objectName}', options.objectName.toLowerCase()),
            });
            mixinFuncs.onBack();
        }
    };
    const handleShowErrorMessage = () => {
        notification({
            type: 'error',
            message: locales.actionFail.replace('${action}', getActionName()),
        });
    };

    const onSaveError = (err, handleError) => {
        mixinFuncs.handleShowErrorMessage();
        setIsSubmitting(false);
        handleError(err);
    };

    const setIsChangedFormValues = (flag) => {
        if (flag !== isChanged) {
            setIsChanged(flag);
        }
    };
    const onBack = () => {
        getFuncOnBack();
    };

    const showCloseFormConfirm = (customDisabledSubmitValue) => {
        const disabledSubmit = customDisabledSubmitValue !== undefined ? customDisabledSubmitValue : !isChanged;

        if (!disabledSubmit) {
            Modal.confirm({
                title: locales.closeFormConfirm,
                content: '',
                okText: locales.yes,
                cancelText: locales.no,
                centered: true,
                onOk: () => {
                    onBack();
                },
            });
        } else {
            onBack();
        }
    };

    const renderActions = (customDisabledSubmitValue) => {
        const disabledSubmit = customDisabledSubmitValue !== undefined ? customDisabledSubmitValue : !isChanged;

        return (
            <Row justify='end' gutter={12}>
                <Col>
                    <Button
                        danger
                        key='cancel'
                        onClick={(e) => {
                            e.stopPropagation();
                            // mixinFuncs.showCloseFormConfirm();
                            onBack();
                        }}
                        icon={<StopOutlined />}
                    >
                        {locales.cancel}
                    </Button>
                </Col>
                <Col>
                    <Button
                        key='submit'
                        htmlType='submit'
                        type='primary'
                        form={mixinFuncs.getFormId()}
                        loading={isSubmitting}
                        disabled={disabledSubmit}
                        icon={<SaveOutlined />}
                    >
                        {options.isEditing ? locales.update : locales.addNew}
                    </Button>
                </Col>
            </Row>
        );
    };

    useEffect(() => {
        if (options.isEditing) {
            mixinFuncs.getDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.isEditing]);
    const overrideHandler = () => {
        const centralizedHandler = {
            getDetail,
            handleFetchDetail,
            mappingData,
            renderActions,
            prepareCreateData,
            prepareUpdateData,
            onSaveCompleted,
            onUpdateCompleted,
            onInsertCompleted,
            onSaveError,
            onSave,
            executeGet,
            executeCreate,
            executeUpdate,
            setDetail,
            handleShowErrorMessage,
            getActionName,
            setIsSubmitting,
            onBack,
            showCloseFormConfirm,
            getFormId,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();
    return {
        isChanged,
        detail,
        mixinFuncs,
        loading,
        onSave,
        setIsChangedFormValues,
        title,
        isSubmitting,
    };
};

export default useModalBase;

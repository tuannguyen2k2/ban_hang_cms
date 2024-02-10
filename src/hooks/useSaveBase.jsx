import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import locales from '../locales';
import useFetch from './useFetch';
import useNotification from './useNotification';
const useSaveBase = ({
    apiConfig = {
        getById: null,
        create: null,
        update: null,
    },
    options = {
        objectName: '',
        getListUrl: '',
    },
    override,
}) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [detail, setDetail] = useState({});
    const detailId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [isEditing, setIsEditing] = useState(params.id !== 'create');
    const { execute: executeGet, loading } = useFetch(apiConfig.getById, {
        immediate: false,
    });
    const { execute: executeCreate } = useFetch(apiConfig.create, {
        immediate: false,
    });
    const { execute: executeUpdate } = useFetch(apiConfig.update, {
        immediate: false,
    });
    const title = locales.titleAction
        .replace('${action}', isEditing ? locales.edit : locales.add)
        .replace('${objectName}', options.objectName);
    const notification = useNotification();

    const mappingData = (response) => {
        if (response.result === true) return response.data;
    };

    const handleFetchDetail = (params) => {
        executeGet({
            ...params,
            pathParams: { id: detailId },
            onCompleted: (response) => {
                setDetail(mixinFuncs.mappingData(response));
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    };

    const getDetail = () => {
        mixinFuncs.handleFetchDetail(detailId);
    };

    const getFormId = () => {
        return `form-${location.pathname}`;
    };

    const onBack = (isSuccess = true) => {
        const doBack = () => {
            if (location?.state?.prevPath === options.getListUrl) {
                navigate(
                    location?.state?.prevPath + location.search,
                    isSuccess && {
                        state: { listData: location.state.listData },
                    }
                );
            } else {
                navigate(options.getListUrl);
            }
        };
        doBack();
    };
    const prepareCreateData = (data) => {
        return data;
    };

    const prepareUpdateData = (data) => {
        return {
            ...data,
            id: detail.id,
        };
    };

    const onSave = (values, callback) => {
        setIsSubmitting(true);
        if (isEditing) {
            executeUpdate({
                pathParams: { id: detail._id },
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
        } else if (isEditing) {
            mixinFuncs.onUpdateCompleted(responseData);
        } else {
            mixinFuncs.onInsertCompleted(responseData);
        }
    };

    const getActionName = () => {
        return isEditing ? locales.update : locales.addNew;
    };

    const onUpdateCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: locales.updateSuccess.replace('${objectName}', options.objectName.toLowerCase()),
            });
            mixinFuncs.onBack(false);
        }
    };

    const onInsertCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: locales.createSuccess.replace('${objectName}', options.objectName.toLowerCase()),
            });
            mixinFuncs.onBack(false);
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
                            mixinFuncs.showCloseFormConfirm();
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
                        {isEditing ? locales.update : locales.addNew}
                    </Button>
                </Col>
            </Row>
        );
    };

    const overrideHandler = () => {
        const centralizedHandler = {
            getDetail,
            handleFetchDetail,
            mappingData,
            getFormId,
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
            setIsEditing,
            handleShowErrorMessage,
            getActionName,
            onBack,
            showCloseFormConfirm,
            setIsSubmitting,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();

    useEffect(() => {
        if (params.id) {
            if (params.id === 'create') setIsEditing(false);
            else mixinFuncs.getDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isChanged,
        detail,
        mixinFuncs,
        loading,
        onSave,
        setIsChangedFormValues,
        isEditing,
        title,
        setIsEditing,
        isSubmitting,
    };
};

export default useSaveBase;

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import BaseModal from '../../components/form/BaseModal';
import TextField from '../../components/form/TextField';
import apiConfig from '../../constants/apiConfig';
import useBasicForm from '../../hooks/useBasicForm';
import useModalBase from '../../hooks/useModalBase';
import locales from '../../locales';
import CropImageField from '../../components/form/CropImageField/CropImageField';
import useFetch from '../../hooks/useFetch';

const BannerModal = ({ openModal, setOpenModal, data, getList, executeUpdateSetting }) => {
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [imageUrl, setImageUrl] = useState();
    const { title, onSave, setIsChangedFormValues, mixinFuncs } = useModalBase({
        apiConfig: apiConfig.setting,
        options: { objectName: locales.banner },
        setOpenModal,
        getList,
        getFuncOnBack: () => {
            handleCancelModal();
        },
    });
    const {
        form,
        onValuesChange,
        mixinFuncs: mixinFuncsBasicForm,
    } = useBasicForm({
        onSubmit: onSave,
        setIsChangedFormValues,
    });
    const handleCancelModal = () => {
        setOpenModal(false);
        setIsChangedFormValues(false);
        form.resetFields();
    };
    const handleSubmit = () => {
        data[0].banner.push({ url: imageUrl });
        executeUpdateSetting({
            pathParams: {
                id: data[0]?._id,
            },
            data: {
                banner: data[0]?.banner,
            },
            onCompleted: () => {
                getList();
                setImageUrl();
                setIsChangedFormValues(false);
            },
        });
        setOpenModal(false);
    };

    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.urlFile);
                    setIsChangedFormValues(true);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };
    return (
        <BaseModal
            open={openModal}
            onCancel={handleCancelModal}
            objectName={locales.banner}
            title={title}
            formId={mixinFuncs.getFormId()}
            form={form}
            footer={mixinFuncs.renderActions()}
            onValuesChange={onValuesChange}
            onFinish={handleSubmit}
        >
            <CropImageField imageUrl={imageUrl} uploadFile={uploadFile} aspect={14 / 9} />
        </BaseModal>
    );
};

export default BannerModal;

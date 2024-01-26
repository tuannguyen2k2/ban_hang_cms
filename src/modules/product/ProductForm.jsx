/* eslint-disable react/prop-types */

import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import BaseForm from '../../components/form/BaseForm';
import CropImageField from '../../components/form/CropImageField/CropImageField';
import TextField from '../../components/form/TextField';
import apiConfig from '../../constants/apiConfig';
import useBasicForm from '../../hooks/useBasicForm';
import useFetch from '../../hooks/useFetch';
import useNotification from '../../hooks/useNotification';
import locales from '../../locales';

const ProductForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues } = props;
    const [fileList, setFileList] = useState([]);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const notification = useNotification();
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, image: fileList });
    };
    const uploadFile = (file, onSuccess, onError) => {
        if (Array.isArray(fileList)) {
            setFileList([...fileList, { status: 'uploading' }]);
            executeUpFile({
                data: {
                    file: file,
                },
                onCompleted: (response) => {
                    if (response.result === true) {
                        onSuccess();
                        const name = response.data.fileName;
                        const url = apiConfig.file.download.baseURL + name;
                        const updatedFileList = fileList.filter((obj) => obj.status !== 'uploading');
                        setFileList([...updatedFileList, { name, url }]);
                        setIsChangedFormValues(true);
                    }
                },
                onError: (error) => {
                    onError();
                },
            });
        } else {
            notification({ type: 'error' });
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        if (Object.keys(dataDetail).length != 0) {
            setFileList(dataDetail?.image);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDetail]);

    return (
        <BaseForm id={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className='card-form' bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={locales.name} name='name' required />
                    </Col>
                    <Col span={12}>
                        <TextField label={locales.description} name='description' />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <CropImageField
                        label={locales.imageProduct}
                        fileList={fileList}
                        setFileList={setFileList}
                        showUploadList={true}
                        maxFile={6}
                        uploadFile={uploadFile}
                    />
                </Row>
                <div className='footer-card-form'>{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default ProductForm;

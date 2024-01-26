/* eslint-disable react/prop-types */

import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import BaseForm from '../../components/form/BaseForm';
import ImageListField from '../../components/form/ImageListField/ImageListField';
import TextField from '../../components/form/TextField';
import apiConfig from '../../constants/apiConfig';
import useBasicForm from '../../hooks/useBasicForm';
import locales from '../../locales';

const ProductForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues } = props;
    const [listFileName, setListFileName] = useState([]);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, image: listFileName });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDetail]);

    console.log(dataDetail);
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
                    <ImageListField
                        name='image'
                        label={locales.imageProduct}
                        action={apiConfig.file.upload.baseURL}
                        setListFileName={setListFileName}
                        listFileName={listFileName}
                    />
                </Row>
                <div className='footer-card-form'>{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default ProductForm;

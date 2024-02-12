/* eslint-disable react/prop-types */
import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import locales from '../../locales';
import useBasicForm from '../../hooks/useBasicForm';
import TextField from '../../components/form/TextField';
import BaseForm from '../../components/form/BaseForm';

const CustomerForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit(values);
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDetail]);
    return (
        <BaseForm id={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className='card-form' bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={locales.nameCustomer} required name='name' />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={locales.email} name='email' type='email' required={!isEditing} />
                    </Col>
                    <Col span={12}>
                        <TextField label={locales.phone} type='number' name='phone' required />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label={locales.password}
                            required={!isEditing}
                            name='password'
                            type='password'
                            rules={[
                                {
                                    validator: async () => {
                                        const isTouched = form.isFieldTouched('password');
                                        if (isTouched) {
                                            const value = form.getFieldValue('password');
                                            if (value.length < 6) {
                                                throw new Error(locales.lengthPasswordError);
                                            }
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label={locales.passwordConfirm}
                            required={!isEditing}
                            name='passwordConfirm'
                            type='password'
                            rules={[
                                {
                                    validator: async () => {
                                        const password = form.getFieldValue('password');
                                        const passwordConfirm = form.getFieldValue('passwordConfirm');
                                        if (password !== passwordConfirm) {
                                            throw new Error(locales.passwordNotMatchError);
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <div className='footer-card-form'>{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default CustomerForm;

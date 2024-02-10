/* eslint-disable react/prop-types */
import { Card, Modal } from 'antd';
import BaseForm from './BaseForm';
const BaseModal = ({
    onCancel,
    open,
    title,
    children,
    form,
    footer = null,
    sizeForm = '100%',
    onValuesChange,
    formId,
    onFinish,
    ...props
}) => {
    return (
        <Modal centered open={open} onCancel={onCancel} footer={footer} title={title} {...props}>
            <Card bordered={false}>
                <BaseForm
                    formId={formId}
                    form={form}
                    size={sizeForm}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                >
                    {children}
                </BaseForm>
            </Card>
        </Modal>
    );
};

export default BaseModal;

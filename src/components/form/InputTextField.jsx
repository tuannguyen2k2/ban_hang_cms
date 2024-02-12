/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input } from 'antd';
import useFormField from '../../hooks/useFormField';

const InputTextField = ({ label = '', name = '', formItemProps, size, type, ...props }) => {
    const { rules, placeholder } = useFormField(props);

    return (
        <Form.Item label={label} name={name} validateFirst rules={rules} {...formItemProps}>
            <Input {...props} placeholder={placeholder} size={size} type={type} />
        </Form.Item>
    );
};

export default InputTextField;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import InputTextField from './InputTextField';
import styles from './SearchForm.module.scss';
import locales from '../../locales';

const searchFields = {
    default: InputTextField,
};

function SearchForm({
    fields = [],
    hiddenAction,
    onSearch,
    className,
    onReset,
    initialValues,
    width = 1100,
    alignSearchField,
    getFormInstance,
    activeTab,
}) {
    const [form] = Form.useForm();

    const handleSearchSubmit = useCallback(
        (values) => {
            onSearch?.(values);
        },
        [form, onSearch]
    );

    const handleClearSearch = () => {
        form.resetFields();
        onReset?.();
    };
    useEffect(() => {
        if (activeTab) {
            form.resetFields();
        }
    }, [activeTab]);
    const renderField = useCallback(
        ({ type, submitOnChanged, onChange, key, renderItem, style, component, ...props }) => {
            if (renderItem) {
                return (
                    <Form.Item {...props} name={key} style={{ marginBottom: '0px' }}>
                        {renderItem()}
                    </Form.Item>
                );
            }

            const Field = component || searchFields[type] || searchFields.default;
            return (
                <Field
                    {...props}
                    name={key}
                    fieldProps={{
                        style: { ...style, width: '100%', height: 32 },
                    }}
                    style={{ ...style, width: '100%', height: 32 }}
                    onChange={(e) => {
                        if (submitOnChanged) {
                            form.submit();
                        } else {
                            onChange?.(e);
                        }
                    }}
                />
            );
        },
        [handleSearchSubmit]
    );

    useEffect(() => {
        getFormInstance?.(form);
    }, [form]);

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues]);
    return (
        <Form form={form} layout='horizontal' className={className || styles.searchForm} onFinish={handleSearchSubmit}>
            <Row align={alignSearchField} gutter={10} style={{ maxWidth: width }}>
                {fields.map((field) => {
                    const { key, colSpan, className, ...props } = field;
                    return (
                        <Col key={key} span={colSpan || 4} className={className}>
                            {renderField({ ...props, key })}
                        </Col>
                    );
                })}
                {!hiddenAction && fields.length > 0 && (
                    <Col>
                        <Button icon={<SearchOutlined />} type='primary' htmlType='submit'>
                            {locales.search}
                        </Button>
                        <Button style={{ marginLeft: 8 }} icon={<ClearOutlined />} onClick={handleClearSearch}>
                            {locales.clear}
                        </Button>
                    </Col>
                )}
            </Row>
        </Form>
    );
}
export default SearchForm;

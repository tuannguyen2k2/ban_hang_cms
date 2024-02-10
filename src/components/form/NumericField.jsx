/* eslint-disable react/prop-types */
import { Form, InputNumber } from 'antd';
import useFormField from '../../hooks/useFormField';

const NumericField = ({
    label,
    name,
    disabled,
    min,
    max,
    width,
    onChange,
    onBlur,
    formatter,
    parser,
    className,
    defaultValue,
    required,
    readOnly,
    addonAfter,
    ...props
}) => {
    const fieldParser = (value) => {
        return value.replace(/\$\s?|(,*)/g, '');
    };

    const { rules, placeholder } = useFormField(props);

    return (
        <Form.Item required={required} label={label} name={name} rules={rules} className={className}>
            <InputNumber
                addonAfter={addonAfter}
                placeholder={placeholder}
                max={max}
                min={min}
                disabled={disabled}
                style={{ width: width || '100%' }}
                formatter={formatter}
                parser={parser || fieldParser}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={readOnly}
                defaultValue={defaultValue}
                {...props}
            />
        </Form.Item>
    );
};

export default NumericField;

/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useBasicForm from "../../hooks/useBasicForm";
import { Card, Col, Row } from "antd";
import locales from "../../locales";
import TextField from "../../components/form/TextField";
import BaseForm from "../../components/form/BaseForm";

const CategoryForm = (props) => {
  const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues } =
    props;

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
  }, [dataDetail]);
  return (
    <BaseForm
      id={formId}
      onFinish={handleSubmit}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Card className="card-form" bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <TextField label={locales.name} name="name" />
          </Col>
        </Row>
        <div className="footer-card-form">{actions}</div>
      </Card>
    </BaseForm>
  );
};

export default CategoryForm;

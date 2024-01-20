/* eslint-disable react/prop-types */
import { useEffect } from "react";
import BaseModal from "../../components/form/BaseModal";
import TextField from "../../components/form/TextField";
import apiConfig from "../../constants/apiConfig";
import useBasicForm from "../../hooks/useBasicForm";
import useModalBase from "../../hooks/useModalBase";
import locales from "../../locales";

const CategoryModal = ({
  openModal,
  setOpenModal,
  isEditing,
  setIsEditing,
  dataRowSelected,
  getList,
}) => {
  const { title, onSave, setIsChangedFormValues, mixinFuncs } = useModalBase({
    apiConfig: apiConfig.category,
    options: { objectName: locales.category, isEditing, dataRowSelected },
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
    setIsEditing(false);
    setIsChangedFormValues(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    return mixinFuncsBasicForm.handleSubmit(values);
  };
  useEffect(() => {
    form.setFieldsValue({
      ...dataRowSelected,
    });
  }, [dataRowSelected]);
  return (
    <BaseModal
      open={openModal}
      onCancel={handleCancelModal}
      objectName={locales.category}
      title={title}
      formId={mixinFuncs.getFormId()}
      form={form}
      footer={mixinFuncs.renderActions()}
      onValuesChange={onValuesChange}
      onFinish={handleSubmit}
    >
      <TextField label={locales.name} name="name" />
    </BaseModal>
  );
};

export default CategoryModal;
//
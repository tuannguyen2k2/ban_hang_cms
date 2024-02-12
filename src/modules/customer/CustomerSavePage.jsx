import apiConfig from '../../constants/apiConfig';
import useSaveBase from '../../hooks/useSaveBase';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import routes from '../../routes/index';
import CustomerForm from './CustomerForm';

const CustomerSavePage = () => {
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.user.getById,
            create: apiConfig.user.create,
            update: apiConfig.user.update,
        },
        options: {
            getListUrl: routes.customerListPage.path,
            objectName: locales.customer,
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                };
            };
        },
    });
    const breadcrumbs = [
        {
            breadcrumbName: locales.customer,
            path: routes.customerListPage.path,
        },
        {
            breadcrumbName: title,
        },
    ];
    return (
        <PageWrapper loading={loading} breadcrumbs={breadcrumbs}>
            <CustomerForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail || {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default CustomerSavePage;

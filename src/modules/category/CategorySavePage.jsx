import routes from './routes';
import locales from '../../locales';
import useSaveBase from '../../hooks/useSaveBase';
import apiConfig from '../../constants/apiConfig';
import PageWrapper from '../../layouts/PageWrapper';
import CategoryForm from './CategoryForm';

const CategorySavePage = () => {
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.category.getById,
            create: apiConfig.category.create,
            update: apiConfig.category.update,
        },
        options: {
            getListUrl: routes.categoryListPage.path,
            objectName: locales.category,
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
            breadcrumbName: locales.category,
            path: routes.categoryListPage.path,
        },
        {
            breadcrumbName: title,
        },
    ];
    return (
        <PageWrapper loading={loading} breadcrumbs={breadcrumbs}>
            <CategoryForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default CategorySavePage;

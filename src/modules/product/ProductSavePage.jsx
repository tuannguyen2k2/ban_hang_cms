import apiConfig from '../../constants/apiConfig';
import useSaveBase from '../../hooks/useSaveBase';
import PageWrapper from '../../layouts/PageWrapper';
import locales from '../../locales';
import routes from '../../routes/index';
import ProductForm from './ProductForm';

const ProductSavePage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryName = searchParams.get('categoryName');
    const categoryId = searchParams.get('categoryId');
    const kindName = searchParams.get('kindName');
    const kindId = searchParams.get('kindId');
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.product.getById,
            create: apiConfig.product.create,
            update: apiConfig.product.update,
        },
        options: {
            getListUrl: routes.productListPage.path,
            objectName: locales.product,
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    kindId,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kindId,
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
            breadcrumbName: locales.kind,
            path: routes.kindListPage.path + `?categoryId=${categoryId}&categoryName=${categoryName}`,
        },
        {
            breadcrumbName: locales.product,
            path:
                routes.productListPage.path +
                `?kindId=${kindId}&kindName=${kindName}&categoryId=${categoryId}&categoryName=${categoryName}`,
        },
        {
            breadcrumbName: title,
        },
    ];
    return (
        <PageWrapper loading={loading} breadcrumbs={breadcrumbs}>
            <ProductForm
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

export default ProductSavePage;

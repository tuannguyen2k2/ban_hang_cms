import BaseTable from "../../components/table/BaseTable";
import apiConfig from "../../constants/apiConfig";
import useFetch from "../../hooks/useFetch";
import ListPage from "../../layouts/ListPage";
import PageWrapper from "../../layouts/PageWrapper";
import locales from "../../locales";

const ProductListPage = () => {
  const { data } = useFetch(apiConfig.category.getAll, { immediate: true });
  console.log(data);
  const breadCrumbs = [
    {
      breadcrumbName: "Sản phẩm",
    },
  ];
  const columns = [
    {
      title: locales.name,
    },
    {
      title: locales.createdAt,
    },
    {
      title: locales.updatedAt,
    },
  ];
  return (
    <PageWrapper routes={breadCrumbs}>
      <ListPage baseTable={<BaseTable columns={columns} />} />
    </PageWrapper>
  );
};

export default ProductListPage;

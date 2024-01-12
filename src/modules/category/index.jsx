import BaseTable from "../../components/table/BaseTable";
import { DEFAULT_TABLE_ITEM_SIZE } from "../../constants";
import apiConfig from "../../constants/apiConfig";
import useListBase from "../../hooks/useListBase";
import ListPage from "../../layouts/ListPage";
import PageWrapper from "../../layouts/PageWrapper";
import locales from "../../locales";
import { convertIsoToLocalTime } from "../../utils/formatDate";

const CategoryListPage = () => {
  const { data, loading, mixinFuncs, pagination } = useListBase({
    apiConfig: apiConfig.category,
    options: {
      pageSize: DEFAULT_TABLE_ITEM_SIZE,
      objectName: locales.category,
    },
  });
  console.log(data);

  const breadCrumbs = [
    {
      breadcrumbName: locales.category,
    },
  ];
  const columns = [
    {
      title: locales.name,
      dataIndex: "name",
    },
    {
      title: locales.createdAt,
      dataIndex: "createdAt",
      render: (createdAt) => {
        return convertIsoToLocalTime(createdAt);
      },
    },
    {
      title: locales.updatedAt,
      dataIndex: "updatedAt",
      render: (updatedAt) => {
        return convertIsoToLocalTime(updatedAt);
      },
    },
  ];
  return (
    <PageWrapper routes={breadCrumbs}>
      <ListPage
        baseTable={
          <BaseTable
            columns={columns}
            dataSource={data}
            loading={loading}
            onChange={mixinFuncs.changePagination}
            pagination={pagination}
          />
        }
      />
    </PageWrapper>
  );
};

export default CategoryListPage;

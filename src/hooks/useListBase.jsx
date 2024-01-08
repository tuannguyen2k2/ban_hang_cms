import { useMemo, useState } from "react";
import useQueryParams from "./useQueryParams";
import useFetch from "./useFetch";
import { useLocation } from "react-router-dom";
import useNotification from "./useNotification";
import { DEFAULT_TABLE_ITEM_SIZE, DEFAULT_TABLE_PAGE_START } from "../constants";

const useListBase = ({
  apiConfig = {
    getList: null,
    delete: null,
    create: null,
    update: null,
    getById: null,
  },
  options = {
    objectName: "",
    pageSize: DEFAULT_TABLE_ITEM_SIZE,
    paramsHolder: {},
  },
  override,
} = {}) => {
  const {
    params: queryParams,
    setQueryParams,
    serializeParams,
    deserializeParams,
  } = useQueryParams();
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const { execute: executeGetList } = useFetch(apiConfig.getList);
//   const { execute: executeDelete } = useFetch(apiConfig.delete);
  const location = useLocation();
  const { listData } = location.state ?? {};
  const [pagination, setPagination] = useState(
    listData
      ? listData.pagination
      : {
          pageSize: options.pageSize,
          total: 0,
          current: 1,
        }
  );
  const notification = useNotification();
  const { pathname: pagePath } = useLocation();
//   const navigate = useNavigate();
  const queryFilter = useMemo(
    () => deserializeParams(queryParams),
    [queryParams]
  );
  const mappingData = (response) => {
    return {
      data: response.data.content,
      total: response.data.totalElements,
    };
  };
  const handleGetListError = () => {
    notification({ type: "error", message: "Get list error" });
  };

  const onCompletedGetList = (response) => {
    const { data, total } = mixinFuncs.mappingData(response);

    setData(data);
    setPagination((p) => ({ ...p, total }));
  };

  const prepareGetListPathParams = () => {
    return {};
  };
  const handleFetchList = (params, isReload) => {
    if (!apiConfig.getList) throw new Error("apiConfig.getList is not defined");
    if (listData && !isReload) {
      setData(listData.data);
      setPagination(listData.pagination);
    } else {
      setLoading(true);
      executeGetList({
        pathParams: mixinFuncs.prepareGetListPathParams(),
        params,
        onCompleted: (response) => {
          mixinFuncs.onCompletedGetList(response);
          setLoading(false);
        },
        onError: (error) => {
          mixinFuncs.handleGetListError(error);
          setLoading(false);
        },
      });
    }
  };

  const prepareGetListParams = (filter) => {
    const copyFilter = { ...filter };

    const page = parseInt(queryParams.get("page"));
    copyFilter.page = page > 0 ? page - 1 : DEFAULT_TABLE_PAGE_START;

    copyFilter.size = options.pageSize;

    return copyFilter;
  };
  const getList = (isReload = false) => {
    const params = mixinFuncs.prepareGetListParams(queryFilter);

    mixinFuncs.handleFetchList({ ...params }, isReload);
  };

  const changeFilter = (filter) => {
    setQueryParams(serializeParams(filter));
  };

  function changePagination(page) {
    queryParams.set("page", page.current);
    setQueryParams(queryParams);
  }

  const handleFilterSearchChange = (values) => {
    mixinFuncs.changeFilter(values);
  };

  const overrideHandler = () => {
    const centralizedHandler = {
      mappingData,
      handleGetListError,
      handleFetchList,
      prepareGetListParams,
      getList,
      changeFilter,
      changePagination,
      onCompletedGetList,
      handleFilterSearchChange,
      prepareGetListPathParams,
      setQueryParams,
    };

    override?.(centralizedHandler);

    return centralizedHandler;
  };

  const mixinFuncs = overrideHandler();

  return {
    loading,
    data,
    setData,
    queryFilter,
    changeFilter,
    changePagination,
    pagination,
    mixinFuncs,
    getList,
    setLoading,
    pagePath,
    serializeParams,
    queryParams,
    setQueryParams,
  };
};

export default useListBase;

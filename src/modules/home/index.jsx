import apiConfig from "../../constants/apiConfig";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const { data } = useFetch(apiConfig.category.getAll, { immediate: true });

  console.log(data);
  //
  return <div>Home</div>;
};

export default Home;

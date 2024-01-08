import categoryRoutes from "../modules/category/routes";
import productRoutes from "../modules/product/routes";
import CategoryListPage from "../modules/category";
const routes = {
  homePage: {
    path: "/",
    component: CategoryListPage,
  },
  ...categoryRoutes,
  ...productRoutes,
};

export default routes;

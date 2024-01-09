import categoryRoutes from "../modules/category/routes";
import productRoutes from "../modules/product/routes";
import HomePage from "../modules/home";
const routes = {
  homePage: {
    path: "/",
    component: HomePage,
  },
  ...categoryRoutes,
  ...productRoutes,
};
export default routes;

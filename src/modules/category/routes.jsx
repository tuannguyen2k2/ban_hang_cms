import CategoryListPage from ".";
import CategorySavePage from "./categorySavePage";

export default {
  categoryListPage: {
    path: "/category",
    component: CategoryListPage,
  },
  categorySavePage: {
    path: "/category/:id",
    component: CategorySavePage,
  },
};

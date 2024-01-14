import CategoryListPage from ".";
import CategorySavePage from "./CategorySavePage";

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

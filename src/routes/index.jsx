import Home from "../modules/home";

const routes = {
  homePage: {
    path: "/",
    component: Home,
    auth: true,
    title: "Home",
  },
};

export default routes;

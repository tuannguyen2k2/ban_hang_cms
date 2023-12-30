/* eslint-disable react/prop-types */
import { Layout } from "antd";
import NavSider from "./NavSider";
import AppHeader from "./AppHeader";

const MainLayout = ({ children }) => {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <NavSider width={250} />
        <Layout>
          <Content>
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default MainLayout;

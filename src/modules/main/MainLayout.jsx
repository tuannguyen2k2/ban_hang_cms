/* eslint-disable react/prop-types */
import { Layout } from "antd";

const MainLayout = ({ children }) => {
  const { Content, Footer, Sider, Header } = Layout;
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
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

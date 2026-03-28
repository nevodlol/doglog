import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const { Content } = Layout;

function DashboardLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ padding: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
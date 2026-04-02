import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const { Content } = Layout;
const SIDEBAR_WIDTH = 250;

function DashboardLayout() {
  return (
    <Layout>
      <Sidebar />

      <Layout style={{ marginLeft: SIDEBAR_WIDTH }}>
        <Content
          style={{
            padding: 20,
            height: "100vh",
            overflow: "auto",
            background: "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
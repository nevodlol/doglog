import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const siderStyle = {
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
};

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: <NavLink to="/dashboard" end>Главная</NavLink>,
    },
    {
      key: "/dashboard/calendar",
      icon: <CalendarOutlined />,
      label: <NavLink to="/dashboard/calendar">Календарь</NavLink>,
    },
    {
      key: "/dashboard/documents",
      icon: <FileTextOutlined />,
      label: <NavLink to="/dashboard/documents">Документы</NavLink>,
    },
  ];

  return (
    <Sider style={siderStyle} width={250}>
      <div
        style={{
          color: "white",
          fontSize: 30,
          padding: 20,
          fontFamily: "PT Mono, Consolas, monospace",
        }}
      >
        ДогЛог
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        // оставляем место снизу под кнопку выхода
        style={{ marginBottom: '60px', borderRight: 0 }}
      >
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>

      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Menu theme="dark" mode="inline" selectable={false}>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Выйти
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
}

export default Sidebar;
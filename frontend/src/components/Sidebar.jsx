import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const siderStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  position: "fixed",
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
      key: "/dashboard/trainings",
      icon: <CalendarOutlined />,
      label: <NavLink to="/dashboard/trainings">Тренировки</NavLink>,
    },
    {
      key: "/dashboard/health",
      icon: <MedicineBoxOutlined />,
      label: <NavLink to="/dashboard/health">Здоровье</NavLink>,
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
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          style={{ marginTop: "auto" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Выйти
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
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
    }
  ];

  const logoutItem = {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Выйти",
    onClick: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
  };

  return (
    <Sider style={siderStyle} width={200}>
      <div
        style={{
          color: "white",
          fontSize: 25,
          padding: 20,
          fontFamily: "PT Mono, Consolas, monospace",
        }}
      >
        DogLog
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1 }}
      />

      <Menu
        theme="dark"
        mode="inline"
        items={[logoutItem]}
        style={{ marginTop: "auto" }} // прижимаем к низу
      />
    </Sider>
  );
}

export default Sidebar;
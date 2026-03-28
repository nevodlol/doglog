import { Menu } from "antd";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Menu mode="inline">
      <Menu.Item key="1">
        <Link to="/dashboard">Главная</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/dashboard/trainings">Тренировки</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/dashboard/health">Здоровье</Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/dashboard/documents">Документы</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Sidebar;
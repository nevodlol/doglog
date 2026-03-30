import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Menu mode="inline">
      <Menu.Item key="1">
        <NavLink to="/dashboard">Главная</NavLink>
      </Menu.Item>

      <Menu.Item key="2">
        <NavLink to="/dashboard/trainings">Тренировки</NavLink>
      </Menu.Item>

      <Menu.Item key="3">
        <NavLink to="/dashboard/health">Здоровье</NavLink>
      </Menu.Item>

      <Menu.Item key="4">
        <NavLink to="/dashboard/documents">Документы</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default Sidebar;
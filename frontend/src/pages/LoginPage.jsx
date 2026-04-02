import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from 'antd';
import "../css/pages/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "123");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="left">
        <Card className="login-card" title="Вход">
          <Input placeholder="Логин" style={{ marginBottom: 10 }} />
          <Input.Password placeholder="Пароль" style={{ marginBottom: 10 }} />
          <Button type="primary" block onClick={handleLogin}>
            Войти
          </Button>
        </Card>
      </div>

      <div className="right">
        <h1>DogLog</h1>
        <p>Система учёта служебных собак</p>
      </div>
    </div>
  );
}

export default LoginPage;
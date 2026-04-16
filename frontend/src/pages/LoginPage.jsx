import { Card, Input, Button } from 'antd';

const LoginPage = () => {
  return (
    <Card className="login-card" title="Вход" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Input placeholder="Логин" style={{ marginBottom: 10 }} />
      <Input.Password placeholder="Пароль" style={{ marginBottom: 10 }} />
      <Button type="primary" block>
        Войти
      </Button>
    </Card>
  );
};

export default LoginPage;
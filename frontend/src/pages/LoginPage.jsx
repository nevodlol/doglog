import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "123");

    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default LoginPage;
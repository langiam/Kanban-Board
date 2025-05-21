// client/src/pages/Login.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login as apiLogin } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // apiLogin returns the raw token string
      const token = await apiLogin(loginData);
      Auth.login(token);
    } catch (err: any) {
      console.error("Failed to login", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Login;

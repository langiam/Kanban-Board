// client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    }
  );

  if (!res.ok) {
    throw new Error("Login failed: Invalid credentials");
  }

  const { token } = await res.json();
  return token;
};

export { login };

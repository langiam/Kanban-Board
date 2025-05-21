// client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  // POST to the real auth endpoint
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    }
  );

  if (!res.ok) {
    throw new Error("Login failed: Invalid credentials");
  }

  // the server returns { token: "…" }
  const { token } = await res.json();
  return token;
};

export { login };

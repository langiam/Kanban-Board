import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  // TODO: make a POST request to the login route
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Login failed: Invalid credentials');
  }

  const { token } = await response.json();
  return token;
}

export { login };

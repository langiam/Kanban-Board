// client/src/utils/auth.ts
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  userId: number;
}

class AuthService {
  getProfile(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      if (typeof exp !== "number") return false;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem("kanban_token");
  }

  login(idToken: string): void {
    localStorage.setItem("kanban_token", idToken);
    window.location.href = "/board";
  }

  logout(): void {
    localStorage.removeItem("kanban_token");
    window.location.href = "/login";
  }
}

export default new AuthService();

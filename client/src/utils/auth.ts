import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile(): JwtPayload | null {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  loggedIn(): boolean {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) return false;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('kanban_token') || '';
  }

  login(idToken: string): void {
    // TODO: set the token to localStorage
    localStorage.setItem('kanban_token', idToken);
    // TODO: redirect to the home page
    window.location.href = '/';
  }

  logout(): void {
    // TODO: remove the token from localStorage
    localStorage.removeItem('kanban_token');
    // TODO: redirect to the login page
    window.location.href = '/login';
  }
}

export default new AuthService();

import { Navigate } from 'react-router-dom';
import AuthService from '../utils/auth';

interface Props { children: JSX.Element; }

const PrivateRoute = ({ children }: Props) => {
  return AuthService.loggedIn()
    ? children
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;

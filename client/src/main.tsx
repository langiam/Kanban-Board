// client/src/main.tsx
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './index.css';

import App         from './App.tsx';
import Board       from './pages/Board.tsx';
import EditTicket  from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login       from './pages/Login.tsx';
import ErrorPage   from './pages/ErrorPage.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

const router = createBrowserRouter([
  // Public login route
  {
    path: '/login',
    element: <Login />,
  },

  // Protected routes
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true,      element: <Board /> },
      { path: 'create',   element: <CreateTicket /> },
      { path: 'edit/:id', element: <EditTicket /> },
    ],
  },

  // Catch-all redirect to login
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

ReactDOM.createRoot(
  document.getElementById('root')!
).render(<RouterProvider router={router} />);

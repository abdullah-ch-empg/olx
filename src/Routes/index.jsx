import { useRoutes } from "react-router-dom";
import { Error } from "../Pages/Error";
import CreateProject from "../Pages/CreateProject";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { Public } from "../Pages/Public";
import Protected from "../utils/ProtectedRoute";
import Dashboard from "../Pages/Dashboard";
export default function Router() {
  let element = useRoutes([
    // Protected Routes
    {
      element: <Protected />,
      children: [
        { path: "/", element: <Home /> },

        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/new",
          element: <CreateProject />,
        },
      ],
    },
    // Public Routes
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/public",
      element: <Public />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return element;
}

export const PROTECTED_ROUTES = [
  {
    // make the parent protected
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
];

export const PUBLIC_ROUTES = [
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/public",
    element: <Public />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

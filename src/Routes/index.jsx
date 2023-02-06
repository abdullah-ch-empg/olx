import { useRoutes } from "react-router-dom";
import { Error } from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { Public } from "../Pages/Public";
import Protected from "../utils/ProtectedRoute";
export default function Router() {
  let element = useRoutes([
    // Protected Routes
    {
      element: <Protected />,
      children: [{ path: "/", element: <Home /> }],
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

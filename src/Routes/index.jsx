import { useRoutes } from "react-router-dom";
import { Error } from "../Pages/Error";
import CreateProject from "../Pages/CreateProject";
import Home from "../Pages/Home";
import { Public } from "../Pages/Public";
import Protected from "../utils/ProtectedRoute";
import Dashboard from "../Pages/Dashboard";
import { ViewDetailsProject } from "../Pages/ViewDetails";
import EditProject from "../Pages/EditProject";
import Login from "../Pages/Login/index.jsx";
export default function Router() {
  let element = useRoutes([
    ...[
      // Protected Routes
      {
        element: <Protected />,
        children: PROTECTED_ROUTES,
      },
    ],
    ...PUBLIC_ROUTES,
  ]);
  return element;
}

const PROTECTED_ROUTES = [
  { path: "/", element: <Home /> },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/new",
    element: <CreateProject />,
  },
  {
    path: "/project/edit",
    element: <EditProject />,
  },
  {
    path: "/dashboard/view-details/:id", //id is a url parameter
    element: <ViewDetailsProject />,
  },
];

const PUBLIC_ROUTES = [
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

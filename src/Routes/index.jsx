import { Error } from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { Public } from "../Pages/Public";
import Protected from "../utils/ProtectedRoute";

export const PROTECTED_ROUTES = [
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
];

export const UNPROTECTED_ROUTES = [
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

import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Protected from "./utils/ProtectedRoute";
import Cookies from "universal-cookie";
import { Public } from "./Pages/Public";
import { Error } from "./Pages/Error";

const cookies = new Cookies();

const isUserSignedIn = () => {
  let uid = cookies.get("uid");
  let accessToken = cookies.get("access-token");
  let client = cookies.get("client");

  return uid && accessToken && client ? true : false;
};
function App() {
  const isSignedIn = isUserSignedIn();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          {/* <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
          </Route>{" "}
          */}

          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/signin"
            element={
              // isSignedIn ? return  :
              <Login />
            }
          />
          <Route path="/public" element={<Public />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

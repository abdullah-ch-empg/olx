import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Protected from "./utils/ProtectedRoute";
import { Public } from "./Pages/Public";
import { Error } from "./Pages/Error";

function App() {
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
          <Route path="/signin" element={<Login />} />
          <Route path="/public" element={<Public />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from "./Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {PROTECTED_ROUTES.map((route, index) => (
            <Route
              key={index + "a"}
              path={route.path}
              element={route.element}
            />
          ))}
          {UNPROTECTED_ROUTES.map((route, index) => (
            <Route
              key={index + "b"}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "../App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "../Routes";
import { Layout } from "../Layout/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

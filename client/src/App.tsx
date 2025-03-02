import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/Layout";
import Main from "./pages/index";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Main />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

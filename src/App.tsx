import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./sections/login/Login";
import Home from "./sections/home/Home";
import ProtectedRoute from "./components/inputs/ProtectedRoute";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./sections/login/Login";
import Home from "./sections/home/Home";
import ProtectedRoute from "./components/inputs/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./sections/login/Login";
import Home from "./sections/home/Home";
import ProtectedRoute from "./components/inputs/ProtectedRoute";
import Layout from "./layout/Layout";
import { NavigationProvider } from "./context/NavigationContext";
import Group from "./sections/group/Group";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavigationProvider>
                <Layout />
              </NavigationProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/group" element={<Group />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

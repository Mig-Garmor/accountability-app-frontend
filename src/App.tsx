import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./sections/login/Login";
import Home from "./sections/home/Home";
import ProtectedRoute from "./components/inputs/ProtectedRoute";
import Layout from "./layout/Layout";
import { NavigationProvider } from "./context/NavigationContext";
import { QueryClient, QueryClientProvider } from "react-query";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Group from "./sections/group/Group";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

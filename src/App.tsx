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
import Pusher from "pusher-js";
import Echo from "laravel-echo";

// Create a client
const queryClient = new QueryClient();

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  cluster: "mt1",
  key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
  wsHost: "localhost",
  wsPort: 6001,
  // wssport: import.meta.env.VITE_APP_PUSHER_APP_KEY,
  transports: ["websocket"],
  enabledTransports: ["ws", "wss"],
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  logToConsole: true, // Enable logging for debugging
});

window.Echo.channel("message").listen("NewMessage", (event) => {
  console.log(event);
});

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

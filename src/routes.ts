// Import your components
import Login from "./sections/login/Login";
import Home from "./sections/home/Home";

// Define your route type
interface Route {
  path: string;
  component: React.ComponentType;
}

// Define your routes
const routes: Route[] = [
  { path: "/login", component: Login },
  { path: "/", component: Home },
];

export default routes;

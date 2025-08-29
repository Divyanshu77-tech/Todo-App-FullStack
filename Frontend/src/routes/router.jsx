import { createBrowserRouter } from "react-router-dom";

import Signup from "../Components/Signup/Signup";
import Landing from "../Components/Landing/Landing";
import Profile from "../Components/Profile/Profile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

export default routes;

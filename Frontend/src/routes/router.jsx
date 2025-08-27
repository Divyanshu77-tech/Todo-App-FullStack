import { createBrowserRouter } from "react-router-dom";

import Signup from "../Components/Signup";
import Landing from "../Components/Landing/Landing";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import Authentication from "./pages/Authentication/Authentication";
import ChangePassword from "./pages/Authentication/ChangePassword";
import VerifyEmail from "./pages/Authentication/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
]);

export default router;

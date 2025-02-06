import Error from "@/pages/ErrorPage";
import Auth from "@pages/Auth";
import AuthWrapper from "@pages/AuthWrapper";
import Home from "@pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  { path: "/auth", element: <Auth /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

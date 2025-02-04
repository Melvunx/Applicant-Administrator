import Auth from "@pages/Auth";
import AuthWrapper from "@pages/AuthWrapper";
import Error from "@pages/Error";
import Home from "@pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    ],
  },

  { path: "/auth", element: <Auth /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

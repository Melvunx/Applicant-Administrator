import Auth from "@pages/Auth";
import Home from "@pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  { path: "/auth", element: <Auth /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

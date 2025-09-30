import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import App from "./App.jsx";

import ProductList from "./pages/ProductList.jsx";
import Login from "./pages/Login.jsx";
import RegisterLayout from "./pages/RegisterLayout.jsx";
import RegisterChooser from "./pages/RegisterChooser.jsx";
import RegisterCustomer from "./pages/RegisterCustomer.jsx";
import RegisterArtisan from "./pages/RegisterArtisan.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext"; // 👈 correct path (lowercase)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <RegisterLayout />,
        children: [
          { index: true, element: <RegisterChooser /> },
          { path: "customer", element: <RegisterCustomer /> },
          { path: "artisan", element: <RegisterArtisan /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
=======
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import NotFound from "./pages/NotFound";
import AdminArtisans from "./pages/AdminArtisans";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./Context/AuthContext";
>>>>>>> 3d255ac6cebe631732a33b79f6fef0fb3f9177e3
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
<<<<<<< HEAD
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
=======
    errorElement: <RootError />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "admin/login", element: <AdminLogin /> },

      // artisan dashboard
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["artisan"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // admin dashboard
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
>>>>>>> 3d255ac6cebe631732a33b79f6fef0fb3f9177e3
    ],
  },
]);

<<<<<<< HEAD
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
=======
const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
>>>>>>> 3d255ac6cebe631732a33b79f6fef0fb3f9177e3
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

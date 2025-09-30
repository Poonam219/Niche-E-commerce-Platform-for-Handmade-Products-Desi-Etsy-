import React from "react";
import ReactDOM from "react-dom/client";
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
import "./styles.css";

function RootError() {
  return (
    <div className="panel" style={{ marginTop: 24 }}>
      <h2 style={{ marginTop: 0 }}>Oops, page not found</h2>
      <p className="helper">Let’s take you back to the homepage.</p>
      <a className="btn" href="/">Go Home</a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
  },
]);

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

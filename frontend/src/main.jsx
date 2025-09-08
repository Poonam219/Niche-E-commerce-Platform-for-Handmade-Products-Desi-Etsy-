import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProductList from "./pages/ProductList.jsx";
import NotFound from "./pages/NotFound.jsx";
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
    errorElement: <RootError />,          // <— handles router errors/404
    children: [
      { index: true, element: <ProductList /> },  // <— homepage
      { path: "*", element: <NotFound /> },       // <— catch-all
    ],
  },
]);

const qc = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

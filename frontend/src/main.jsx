import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductList from "./pages/ProductList.jsx";
import "./styles.css";

function AppLayout(){
  return (
    <div>
      <header className="header">
        <div className="navbar container">
          <div className="brand">
            <div className="brand-logo" />
            <div className="brand-title">desi-etsy</div>
          </div>
          <div className="actions">
            <button className="btn">Sign in</button>
            <button className="btn primary">Become an Artisan</button>
          </div>
        </div>
      </header>

      <section className="hero container">
        <motion.h1 initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:.4}}>
          Discover Handmade Treasures
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.15, duration:.4}}>
          Authentic crafts from local artisans. Filter, explore and support small makers.
        </motion.p>
      </section>

      <main className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{opacity:0, y:8}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-8}}
            transition={{duration:.25}}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container footer">
        © {new Date().getFullYear()} desi-etsy · Built with ❤️ for artisans
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <AppLayout/>, children: [{ index: true, element: <ProductList/> }] }
]);

const qc = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

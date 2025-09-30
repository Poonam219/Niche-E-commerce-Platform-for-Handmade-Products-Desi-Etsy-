import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./Context/AuthContext";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header className="header">
        <div className="navbar container">
          <div className="brand">
            <div className="brand-logo" />
            <div className="brand-title">desi-etsy</div>
          </div>

          <div className="actions">
            {!user ? (
              <>
                <Link className="btn" to="/login">Sign in</Link>
                <Link className="btn primary" to="/register">Become an Artisan</Link>
              </>
            ) : user.role === "admin" ? (
              <>
                <Link className="btn" to="/admin">Admin Panel</Link>
                <button className="btn danger" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn" to="/dashboard">Dashboard</Link>
                <button className="btn danger" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="hero container">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Discover Handmade Treasures
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          Authentic crafts from local artisans. Filter, explore and support small makers.
        </motion.p>
      </section>

      <main className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container footer">
        © {new Date().getFullYear()} desi-etsy · Crafted for artisans
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

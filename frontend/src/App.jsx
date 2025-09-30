import { Outlet, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const location = useLocation();

  return (
    <div>
      <header className="header">
        <div className="navbar container">
          <Link to="/" className="brand" aria-label="Desi-Etsy home">
            <div className="brand-logo" />
            <div className="brand-title">desi-etsy</div>
          </Link>

          <nav className="actions" aria-label="Primary">
            <Link className="btn" to="/login">Sign in</Link>
            
            <Link className="btn primary" to="/register">Register</Link>
          </nav>
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
    </div>
  );
}

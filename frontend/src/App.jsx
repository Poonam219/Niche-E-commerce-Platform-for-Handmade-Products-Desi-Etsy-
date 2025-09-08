import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="navbar container">
          <div className="brand">
            <div className="brand-logo" />
            <div className="brand-title">desi-etsy</div>
          </div>
          <div className="actions">
            <a className="btn" href="/login">Sign in</a>
            <a className="btn primary" href="/register">Become an Artisan</a>
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
        © {new Date().getFullYear()} desi-etsy · Crafted for artisans
      </footer>
    </div>
  );
}

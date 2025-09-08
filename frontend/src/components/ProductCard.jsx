import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  return (
    <motion.div
      className="card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <img
        className="img"
        src={item.images?.[0] || "https://picsum.photos/400/300"}
        alt={item.title}
      />
      <div className="body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 16 }}>{item.title}</div>
          <span className="badge">{item.category}</span>
        </div>
        <div className="meta">
          <span>By {item.artisan?.name || "Artisan"}</span>
          <span className="price">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(item.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

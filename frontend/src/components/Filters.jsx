import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Filters(){
  const location = useLocation();
  const navigate = useNavigate();
  const sp = new URLSearchParams(location.search);

  const setParam = (k, v) => {
    if (!v) sp.delete(k); else sp.set(k, v);
    navigate({ search: sp.toString() });
  };

  return (
    <motion.div className="panel" initial={{opacity:0, y:6}} animate={{opacity:1, y:0}}>
      <div className="filters">
        <input className="input" placeholder="Search products…" defaultValue={sp.get("q")||""}
               onChange={e=>setParam("q", e.target.value)} />
        <select className="select" defaultValue={sp.get("category")||""}
                onChange={e=>setParam("category", e.target.value)}>
          <option value="">All categories</option>
          <option>Textiles</option>
          <option>Jewelry</option>
          <option>Pottery</option>
          <option>Woodcraft</option>
          <option>Metalwork</option>
          <option>Home Decor</option>
        </select>
        <input className="input" type="number" placeholder="Min price" defaultValue={sp.get("minPrice")||""}
               onChange={e=>setParam("minPrice", e.target.value)} />
        <input className="input" type="number" placeholder="Max price" defaultValue={sp.get("maxPrice")||""}
               onChange={e=>setParam("maxPrice", e.target.value)} />
        <select className="select" defaultValue={sp.get("sort")||"createdAt:desc"}
                onChange={e=>setParam("sort", e.target.value)}>
          <option value="createdAt:desc">Newest</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
        </select>
      </div>
    </motion.div>
  );
}

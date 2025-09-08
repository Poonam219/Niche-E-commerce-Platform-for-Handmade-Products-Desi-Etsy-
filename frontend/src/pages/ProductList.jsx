import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export default function ProductList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await client.get("/api/products")).data,
  });

  if (isError) return <div className="panel">Failed to load products</div>;
  if (isLoading) return <div className="panel">Loading…</div>;

  const items = data?.data || [];

  return (
    <div className="grid">
      {items.map((p) => (
        <ProductCard key={p._id} item={p} />
      ))}
    </div>
  );
}

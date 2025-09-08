import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { SkeletonCard } from "../components/SkeletonCard";

export default function ProductList(){
  const { search } = useLocation();
  const params = useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params)
  });

  const items = data?.data || [];

  return (
    <div>
      <Filters />

      {isError && (
        <div className="panel" style={{marginTop:16, color:"salmon"}}>
          Error: {String(error)}
        </div>
      )}

      {isLoading ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="panel" style={{marginTop:16}}>
          No products match your filters.
        </div>
      ) : (
        <div className="grid">
          {items.map(p => <ProductCard key={p._id} item={p} />)}
        </div>
      )}
    </div>
  );
}

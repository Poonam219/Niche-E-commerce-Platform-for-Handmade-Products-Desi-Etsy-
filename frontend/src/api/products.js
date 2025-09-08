import client from "./client";
export const fetchProducts = (params) =>
  client.get("/api/products", { params }).then(r => r.data);

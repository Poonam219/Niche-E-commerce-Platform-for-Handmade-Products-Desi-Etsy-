// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../utils/api"; // axios instance with baseURL + token
// import { toast } from "react-toastify";
// import ProductForm from "./ProductForm";

// export default function MyProducts() {
//   const queryClient = useQueryClient();

//   const { data: products, isLoading } = useQuery(
//     ["artisanProducts"],
//     () => api.get("/artisan/products").then(res => res.data)
//   );

//   const deleteMutation = useMutation(
//     (id) => api.delete(`/artisan/products/${id}`),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["artisanProducts"]);
//         toast.success("Product deleted");
//       },
//       onError: () => toast.error("Failed to delete"),
//     }
//   );

//   if (isLoading) return <p>Loading...</p>;

//   if (!products?.length) {
//     return (
//       <div>
//         <p>No products yet. Add your first product!</p>
//         <ProductForm />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">My Products</h2>
//         <ProductForm />
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Title</th>
//             <th className="p-2 border">Category</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(p => (
//             <tr key={p._id}>
//               <td className="border p-2">{p.title}</td>
//               <td className="border p-2">{p.category}</td>
//               <td className="border p-2">${p.price}</td>
//               <td className="border p-2 flex gap-2">
//                 <ProductForm product={p} />
//                 <button
//                   onClick={() => deleteMutation.mutate(p._id)}
//                   className="text-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const r = await api.get("/api/products/my");
      return r.data.data;
    },
  });

  const del = useMutation({
    mutationFn: (id) => api.delete(`/api/products/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] }); // matches queryKey above
    },
  });

  if (!user) return null;

  const disabled = user.approvalStatus !== "approved";

  return (
    <div className="panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>My Products</h3>
        <Link to="/dashboard/products/new">
          <button
            className="btn"
            disabled={disabled}
            title={disabled ? "Awaiting approval" : "Add product"}
          >
            Add Product
          </button>
        </Link>
      </div>

      {disabled && (
        <div className="banner">
          Your account is {user?.approvalStatus || "pending"}. You cannot create products yet.
        </div>
      )}


      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: 12 }}>
          {!data || data.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            data.map((p) => (
              <div key={p._id} className="card" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{p.title}</strong>
                    <div>
                      {p.category} • ₹{p.price}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link to={`/dashboard/products/${p._id}/edit`}>
                      <button className="btn">Edit</button>
                    </Link>
                    <button
                      className="btn danger"
                      onClick={() => del.mutate(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
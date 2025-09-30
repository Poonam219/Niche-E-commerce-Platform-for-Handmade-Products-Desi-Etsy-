// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { useAuth } from "../../Hooks/useAuth";
// import { useState } from "react";

// export default function ProductForm({ product }) {
//   const { user } = useAuth();
//   const [preview, setPreview] = useState(product?.image || null);
//   const queryClient = useQueryClient();

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: product || { title: "", price: "", category: "", image: "" },
//   });

//   const mutation = useMutation(
//     (data) => {
//       if (product) return api.patch(`/artisan/products/${product._id}`, data);
//       return api.post("/artisan/products", data);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["artisanProducts"]);
//         toast.success(product ? "Product updated" : "Product added");
//         reset();
//       },
//       onError: () => toast.error("Action failed"),
//     }
//   );

//   if (!user?.isApproved) {
//     return (
//       <button className="bg-gray-300 px-3 py-1 rounded" disabled>
//         Awaiting Approval
//       </button>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit((data) => mutation.mutate(data))}
//       className="flex flex-col gap-2"
//     >
//       <input {...register("title")} placeholder="Title" required />
//       <input {...register("category")} placeholder="Category" required />
//       <input type="number" {...register("price")} placeholder="Price" required />

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files[0];
//           if (file) {
//             setPreview(URL.createObjectURL(file));
//           }
//         }}
//       />

//       {preview && <img src={preview} alt="preview" className="h-20 w-20" />}

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {product ? "Update" : "Add"} Product
//       </button>
//     </form>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductForm({ mode = "new" }) {
  const { id } = useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:"", price:"", description:"", category:"", images: [] });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id && mode === "edit") {
      api.get(`/api/products/${id}`).then(r => setForm(r.data.data));
    }
  }, [id, mode]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    // upload on submit — here we'll send file as FormData
    setForm(prev => ({ ...prev, _file: file }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      // if there's a file, upload first
      const payload = { title: form.title, price: +form.price, description: form.description, category: form.category };

      if (form._file) {
        const fd = new FormData();
        fd.append("file", form._file);
        // backend must support file upload at /api/uploads (adjust as needed)
        const up = await api.post("/api/uploads", fd, { headers: { "Content-Type": "multipart/form-data" } });
        payload.images = [ up.data.url ];
      } else {
        payload.images = form.images || [];
      }

      if (mode === "new") {
        await api.post("/api/products", payload);
      } else {
        await api.patch(`/api/products/${id}`, payload);
      }

      qc.invalidateQueries(["artisanProducts"]);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Failed to save product");
    }
  };

  return (
    <div className="panel" style={{ maxWidth:700 }}>
      <h3>{mode === "new" ? "Add Product" : "Edit Product"}</h3>
      <form onSubmit={handleSubmit} className="form">
        <label>Title</label>
        <input value={form.title} onChange={e => setForm({...form,title:e.target.value})} required />

        <label>Category</label>
        <input value={form.category} onChange={e => setForm({...form,category:e.target.value})} />

        <label>Price (INR)</label>
        <input type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} required />

        <label>Description</label>
        <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} />

        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && <img src={preview} alt="preview" style={{width:120, marginTop:8}} />}

        <button type="submit" className="btn primary">{mode==="new" ? "Add product" : "Save changes"}</button>
      </form>
    </div>
  );
}

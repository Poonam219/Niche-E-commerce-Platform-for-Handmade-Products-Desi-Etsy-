// import { useAuth } from "../Context/AuthContext";


// export default function Dashboard() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="container" style={{ marginTop: 32 }}>
//       <h2>
//         Welcome, <span style={{ color: "#32CD32" }}>{user?.email}</span> 🎉
//       </h2>
//       <p>
//         You are logged in as <strong>{user?.role}</strong>.
//       </p>

//       <button
//         onClick={logout}
//         style={{
//           marginTop: "16px",
//           padding: "8px 16px",
//           borderRadius: "6px",
//           border: "none",
//           backgroundColor: "#e63946",
//           color: "#fff",
//           fontWeight: "bold",
//           cursor: "pointer",
//           transition: "0.2s ease-in-out",
//         }}
//         onMouseOver={(e) => (e.target.style.backgroundColor = "#d62828")}
//         onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


import ProfilePanel from "../components/dashboard/ProfilePanel";
import MyProducts from "../components/dashboard/MyProducts";

export default function Dashboard() {
  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
        <ProfilePanel />
        <MyProducts />
      </div>
    </div>
  );
}

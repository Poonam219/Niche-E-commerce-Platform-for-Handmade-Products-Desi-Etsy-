import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/admin/artisans?status=pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setArtisans(data.data || []));
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/artisans/${id}/approval`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ approvalStatus: status }),
    });
    setArtisans((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <div className="panel">
      <h2>Admin Dashboard</h2>
      <p>Approve or reject artisans</p>
      <ul>
        {artisans.map((a) => (
          <li key={a._id}>
            {a.name} - {a.email}
            <button onClick={() => updateStatus(a._id, "approved")}>Approve</button>
            <button onClick={() => updateStatus(a._id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useState } from "react";

export default function RegisterCustomer() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Submitting...");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "customer" })
      });
      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Customer registered successfully!");
        console.log("Customer:", data.user);
      } else {
        setMsg("❌ " + data.message);
      }
    } catch (err) {
      setMsg("❌ Network error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "30px auto" }}>
      <h2>Register as Customer</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <input
          className="input"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn primary" type="submit">
          Create Customer Account
        </button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}

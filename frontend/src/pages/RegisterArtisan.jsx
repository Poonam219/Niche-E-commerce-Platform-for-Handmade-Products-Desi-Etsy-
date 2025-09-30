import { useState } from "react";

export default function RegisterArtisan() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    bio: "",
    portfolioUrl: ""
  });
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: "artisan",
          artisanProfile: {
            shopName: form.shopName,
            bio: form.bio,
            portfolioUrl: form.portfolioUrl || undefined
          }
        })
      });
      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Artisan registered (pending admin approval).");
        console.log("Artisan:", data.user);
      } else {
        setMsg("❌ " + data.message);
      }
    } catch (err) {
      setMsg("❌ Network error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>Register as Artisan</h2>
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
        <input
          className="input"
          name="shopName"
          placeholder="Shop name"
          value={form.shopName}
          onChange={handleChange}
          required
        />
        <textarea
          className="input"
          name="bio"
          placeholder="Tell us about your craft (min 20 chars)"
          value={form.bio}
          onChange={handleChange}
          required
          rows={3}
        />
        <input
          className="input"
          name="portfolioUrl"
          placeholder="Portfolio / Website URL (optional)"
          value={form.portfolioUrl}
          onChange={handleChange}
        />
        <button className="btn primary" type="submit">
          Submit Artisan Application
        </button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}

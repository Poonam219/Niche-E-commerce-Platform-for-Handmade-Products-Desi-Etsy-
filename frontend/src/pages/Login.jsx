import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const onSubmit = async (data) => {
  try {
    const user = await login(data.email, data.password);
    toast.success("Logged in successfully!");
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    toast.error("Invalid credentials. Try again.");
  }
};


  return (
    <div className="container" style={{ maxWidth: 480, marginTop: 32 }}>
      <div className="panel">
        <h2>Login</h2>
        <p className="helper">Enter your credentials to access your dashboard.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="btn primary" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

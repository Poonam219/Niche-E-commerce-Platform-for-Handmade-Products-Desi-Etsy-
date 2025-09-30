import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitted artisan data:", data);
      toast.success("Registration submitted! Awaiting admin approval.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to register, please try again.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, marginTop: 32 }}>
      <div className="panel">
        <h2>Register as Artisan</h2>
        <p className="helper">
          Sign up to showcase your handmade products. Your account must be
          approved by admin before you can start selling.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" {...register("name", { required: "Name is required" })} />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          {/* Contact */}
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              {...register("contact", { required: "Contact number is required" })}
            />
            {errors.contact && <span className="error">{errors.contact.message}</span>}
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>Bio (optional)</label>
            <textarea rows="3" {...register("bio")} />
          </div>

          <button type="submit" className="btn primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
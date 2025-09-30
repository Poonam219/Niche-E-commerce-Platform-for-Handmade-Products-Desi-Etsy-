import mongoose from "mongoose";

const artisanProfileSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true, trim: true },
    bio: { type: String, required: true, minlength: 20, maxlength: 1000 },
    portfolioUrl: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    website: { type: String }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["customer", "artisan", "admin"], default: "customer" },

    // approval flow for artisans
    isApproved: { type: Boolean, default: true },
    approval: {
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
      reason: String,
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reviewedAt: Date
    },

    // only present for artisans
    artisanProfile: { type: artisanProfileSchema, required: function () { return this.role === "artisan"; } }
  },
  { timestamps: true }
);

// auto-set approval for artisans
userSchema.pre("save", function (next) {
  if (this.isModified("role") && this.role === "artisan") {
    this.isApproved = false;
    this.approval = { status: "pending" };
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

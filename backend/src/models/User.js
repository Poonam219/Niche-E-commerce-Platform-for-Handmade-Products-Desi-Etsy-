import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["customer", "artisan", "admin"],
      default: "customer"
    },
    // Week-2 fields (approval flow)
    isApproved: { type: Boolean, default: true }, // for artisans: default false
    approval: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "approved" // if role=artisan, set to pending on creation
      },
      reason: String,
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reviewedAt: Date
    }
  },
  { timestamps: true }
);

// ensure artisans are pending by default
userSchema.pre("save", function (next) {
  if (this.isModified("role") && this.role === "artisan") {
    this.isApproved = false;
    this.approval = { status: "pending" };
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

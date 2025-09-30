import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = () => async (req, res, next) => {
  try {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Load fresh user (optional but useful)
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = {
      _id: user._id,
      role: user.role,
      isApproved: user.isApproved
    };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export const requireApprovedArtisan = (req, res, next) => {
  if (req.user?.role !== "artisan" || !req.user?.isApproved) {
    return res
      .status(403)
      .json({ message: "Your artisan account is not approved yet." });
  }
  next();
};

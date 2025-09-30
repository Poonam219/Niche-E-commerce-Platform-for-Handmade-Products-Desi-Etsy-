import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), role: user.role, isApproved: user.isApproved },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

export async function register(req, res) {
  try {
    const { name, email, password, role = "customer" } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role
      // pre-save hook sets approval for artisan
    });

    const token = signToken(user);
    return res.status(201).json({
      message: "Registered",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.json({
      message: "Logged in",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}

export async function me(req, res) {
  return res.json({ user: req.user });
}

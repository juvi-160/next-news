import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const createToken = (email) => {
  return jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(email);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

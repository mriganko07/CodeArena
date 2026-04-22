import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import { sendEmail, verificationEmailHTML } from "../utils/sendEmail.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      twoFactorEnabled: user.twoFactorEnabled,
    },
  });
};

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
router.post(
  "/signup",
  [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists.",
        });

      const user = await User.create({ firstName, lastName, email, password });

      const rawToken = user.generateEmailVerifyToken();
      await user.save({ validateBeforeSave: false });

      const verifyURL = `${process.env.CLIENT_URL}/verify-email/${rawToken}`;

      try {
        await sendEmail({
          to: user.email,
          subject: "Verify your CodeArena email",
          html: verificationEmailHTML(user.firstName, verifyURL),
        });

        return res.status(201).json({
          success: true,
          message: "Account created! Please check your email to verify your account.",
        });
      } catch (emailError) {
        // Email failed — still created the account, tell the user
        console.error("Email send error:", emailError.message);
        return res.status(201).json({
          success: true,
          message: "Account created but we couldn't send the verification email. Contact support.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  }
);

// ── GET /api/auth/verify-email/:token ─────────────────────────────────────────
router.get("/verify-email/:token", async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      emailVerifyToken: hashedToken,
      emailVerifyExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired.",
      });

    // ✅ This was commented out — fixed
    user.isVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ success: false, message: "Invalid email or password." });

      if (!user.isVerified)
        return res.status(403).json({
          success: false,
          message: "Please verify your email before logging in.",
        });

      if (user.twoFactorEnabled) {
        const preAuthToken = jwt.sign(
          { id: user._id, twoFactorPending: true },
          process.env.JWT_SECRET,
          { expiresIn: "10m" }
        );
        return res.status(200).json({
          success: true,
          twoFactorRequired: true,
          preAuthToken,
        });
      }

      sendTokenResponse(user, 200, res);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  }
);

// ── GET /api/auth/me (protected) ──────────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
router.post("/logout", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

export default router;
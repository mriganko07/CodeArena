import express from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/2fa/setup — returns QR code to scan in Google Authenticator
router.post("/setup", protect, async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `CodeArena (${req.user.email})`,
      length: 20,
    });

    await User.findByIdAndUpdate(req.user._id, { twoFactorSecret: secret.base32 });

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    res.json({ success: true, qrCode: qrCodeDataURL, secret: secret.base32 });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to set up 2FA." });
  }
});

// POST /api/2fa/verify-setup — user scans QR and enters first code to confirm
router.post("/verify-setup", protect, async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findById(req.user._id).select("+twoFactorSecret");

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid)
      return res.status(400).json({ success: false, message: "Invalid code. Please try again." });

    user.twoFactorEnabled = true;
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, message: "2FA enabled successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// POST /api/2fa/validate — during login, exchange preAuthToken + TOTP for real JWT
router.post("/validate", async (req, res) => {
  const { preAuthToken, token } = req.body;

  try {
    const decoded = jwt.verify(preAuthToken, process.env.JWT_SECRET);
    if (!decoded.twoFactorPending)
      return res.status(400).json({ success: false, message: "Invalid pre-auth token." });

    const user = await User.findById(decoded.id).select("+twoFactorSecret");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid)
      return res.status(400).json({ success: false, message: "Invalid authenticator code." });

    const realToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      success: true,
      token: realToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Token invalid or expired." });
  }
});

// POST /api/2fa/disable
router.post("/disable", protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      twoFactorEnabled: false,
      twoFactorSecret: undefined,
    });
    res.json({ success: true, message: "2FA disabled." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
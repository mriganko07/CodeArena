import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";
import connectDB from "./lib/db.js";

import authRoutes from "./routes/auth.js";
import googleRoutes, { initGoogleStrategy } from "./routes/google.js";  // ← updated
import twoFactorRoutes from "./routes/twoFactor.js";

dotenv.config();          // ← loads .env first
initGoogleStrategy();     // ← NOW process.env values are available
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 20,
//   message: { success: false, message: "Too many requests. Please try again later." },
// });


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 20 : 1000, // unlimited in dev
  message: { success: false, message: "Too many requests. Please try again later." },
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/auth/google", googleRoutes);
app.use("/api/2fa", authLimiter, twoFactorRoutes);

app.get("/", (req, res) => res.json({ status: "API is running 🚀" }));
app.get("/api/test", (req, res) => res.json({ message: "Frontend + Backend Connected" }));

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found." }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express from "express";
import User from "../models/User.js";
import Drive from "../models/Drive.js";
import Interview from "../models/Interview.js";
import InterviewResult from "../models/InterviewResult.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

router.get("/drives", async (req, res) => {
  try {
    const drives = await Drive.find().sort({ driveDate: -1 });
    res.json({ success: true, data: drives });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch drives" });
  }
});

router.post("/drives", async (req, res) => {
  try {
    const newDrive = await Drive.create(req.body);
    res.status(201).json({ success: true, data: newDrive });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/drives/:id", async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Drive deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete drive" });
  }
});

router.get("/interviews", async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("driveId", "hiringPositionName driveDate")
      .populate("userIds", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch interviews" });
  }
});

router.post("/interviews", async (req, res) => {
  try {
    const { driveId, userIds } = req.body;
    if (!driveId || !userIds || userIds.length === 0) {
      return res.status(400).json({ success: false, message: "Drive and at least one user are required." });
    }
    const newInterview = await Interview.create({ driveId, userIds });
    res.status(201).json({ success: true, data: newInterview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put("/interviews/:id", async (req, res) => {
  try {
    const { userIds } = req.body;
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      { userIds },
      { new: true }
    );
    res.json({ success: true, data: updatedInterview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/results", async (req, res) => {
  try {
    const results = await InterviewResult.find()
      .populate("userId", "firstName lastName email")
      .populate("driveId", "hiringPositionName totalMarks")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch results" });
  }
});

export default router;
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  driveId: { type: mongoose.Schema.Types.ObjectId, ref: "Drive", required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
}, { timestamps: true });

export default mongoose.model("Interview", interviewSchema);
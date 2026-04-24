import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
  driveId: { type: String, required: true, unique: true },
  hiringPositionName: { type: String, required: true },
  driveDate: { type: Date, required: true },
  driveType: { type: String, enum: ["mcq", "code base"], required: true },
  timeDurationInMin: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  marksPerQuestion: { type: Number, required: true }, 
  totalMarks: { type: Number } 
}, { timestamps: true });

driveSchema.pre("save", async function () {
  if (this.numberOfQuestions && this.marksPerQuestion) {
    this.totalMarks = this.numberOfQuestions * this.marksPerQuestion;
  }
});

export default mongoose.model("Drive", driveSchema);
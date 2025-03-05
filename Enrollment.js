const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Completed", "Dropped"], default: "Active" }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;

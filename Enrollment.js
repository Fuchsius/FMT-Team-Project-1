
const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  courseID: { type: String, required: true },
  status: { type: String, default: "pending" }, // Default status
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);

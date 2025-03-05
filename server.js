require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Enrollment = require("./models/enrollment");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Course Enrollment API is running...");
});

// Route to add an enrollment
app.post("/enroll", async (req, res) => {
  try {
    const { studentID, courseID, status } = req.body;
    const newEnrollment = new Enrollment({ studentID, courseID, status });
    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment added successfully!", enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: "Error adding enrollment", error });
  }
});

// Route to get all enrollments
app.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("studentID courseID");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
});

// Route to update enrollment status
app.put("/enrollments/:id", async (req, res) => {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: "Error updating enrollment", error });
  }
});

// Route to delete an enrollment
app.delete("/enrollments/:id", async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enrollment", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

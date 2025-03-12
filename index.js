const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");



const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI

const uri = "mongodb+srv://chamanthikaranaweera:@skillgrow.auylm.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB once and keep the connection open
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
connectDB(); // Call the function to establish a connection

// Database Collections
const database = client.db("skill-growdb");
const userCollection = database.collection("user");
const courseCollection = database.collection("course");
const eventCollection = database.collection("event");
const bookCollection = database.collection("book");
const enrollmentCollection = database.collection("enrollment");


// Enroll a student
exports.enrollStudent = async (req, res) => {
  try {
    const { studentID, courseID } = req.body;
    const newEnrollment = new Enrollment({ studentID, courseID });
    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment successful!", enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling student", error });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrollments", error });
  }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollment", error });
  }
};

// Update enrollment status
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedEnrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment updated!", enrollment: updatedEnrollment });
  } catch (error) {
    res.status(500).json({ message: "Error updating enrollment", error });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enrollment", error });
  }
};


// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

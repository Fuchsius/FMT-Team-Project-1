const express = require('express');
const router = express.Router();
const { ObjectId, courseCollection } = require('../../models/db');

// Add a new course
router.post('/', async (req, res) => {
  try {
    const newCourse = req.body;
    const result = await courseCollection.insertOne(newCourse);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const result = await courseCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await courseCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// Update course by ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = req.body;
    const result = await courseCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCourse }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
});

// Delete course by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await courseCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

module.exports = router; 
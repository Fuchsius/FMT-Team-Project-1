const express = require('express');
const router = express.Router();
const { ObjectId, client } = require('../../models/db');

// Helper to get the enrollment collection
function getEnrollmentCollection() {
  const database = client.db('skill-growdb');
  return database.collection('entrollements');
}

// Enroll a student
router.post('/', async (req, res) => {
  try {
    const { studentID, courseID, status } = req.body;
    if (!studentID || !courseID) {
      return res.status(400).json({ message: 'studentID and courseID are required.' });
    }
    const newEnrollment = { studentID, courseID, status: status || 'pending' };
    const enrollmentCollection = getEnrollmentCollection();
    const result = await enrollmentCollection.insertOne(newEnrollment);
    // Return the inserted document with its _id
    res.status(201).json({
      message: 'Enrollment successful!',
      enrollment: { ...newEnrollment, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling student', error });
  }
});

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollmentCollection = getEnrollmentCollection();
    const enrollments = await enrollmentCollection.find().toArray();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving enrollments', error });
  }
});

// Get enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const enrollmentCollection = getEnrollmentCollection();
    const enrollment = await enrollmentCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollment', error });
  }
});

// Update enrollment status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const enrollmentCollection = getEnrollmentCollection();
    const result = await enrollmentCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { status } },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ message: 'Enrollment not found' });
    res.status(200).json({ message: 'Enrollment updated!', enrollment: result.value });
  } catch (error) {
    res.status(500).json({ message: 'Error updating enrollment', error });
  }
});

// Delete an enrollment
router.delete('/:id', async (req, res) => {
  try {
    const enrollmentCollection = getEnrollmentCollection();
    const result = await enrollmentCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Enrollment not found' });
    res.status(200).json({ message: 'Enrollment deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting enrollment', error });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const { ObjectId, bookCollection } = require('../../models/db');

// Add a new book
router.post('/', async (req, res) => {
  try {
    const newBook = req.body;
    const result = await bookCollection.insertOne(newBook);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const result = await bookCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }
    const result = await bookCollection.findOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

// Update book by ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = req.body;
    const result = await bookCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBook }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete book by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router; 
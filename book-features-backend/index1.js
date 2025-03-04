//imasha-book features
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port =  3009;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@skillgrow.auylm.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow`;

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
const booksCollection = database.collection("books");

// Route to add a new book
app.post('/books', async (req, res) => {
  try {
    const newBook = req.body;
    const result = await booksCollection.insertOne(newBook);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const result = await booksCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Simple version to fetch book by ID
app.get('/books/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      // Validate if the ID is a valid ObjectId format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid book ID format" });
      }
  
      // Query the database for the book by ID
      const result = await booksCollection.findOne({ _id: new ObjectId(id) });
  

  
      // If the book is found, return it
      res.json(result);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Error fetching book", error });
    }
  });
  
// Update book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = req.body;

    const result = await booksCollection.updateOne(
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
app.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }

        const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("🔥 Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book", error: error.message || error });
    }
});


// Root route
app.get('/', (req, res) => {
  res.send('📚 Books API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
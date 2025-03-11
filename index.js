const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@skillgrow.auylm.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow`;

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

// Route to add a new course
app.post('/new-course', async (req, res) => {
  try {
    const newCourse = req.body;
    const result = await courseCollection.insertOne(newCourse);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
});

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const result = await courseCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Get a specific course by ID
app.get('/course/:id', async (req, res) => {
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

// update course by id
app.put('/course/:id', async (req, res) => {
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

  //delete course by id
  app.delete('/course/:id', async (req, res) => {
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

  // add new user
  app.post('/new-user', async (req, res) => {
    const newUser = req.body;

    const result = await userCollection.insertOne(newUser);
    res.send(result);
  });

 // GET ALL USERS
 app.get('/users', async (req, res) => {
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

// GET USER BY ID
app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await userCollection.findOne({ _id: new ObjectId(id) });
  res.send(user);
});

 // GET USER BY EMAIL
 app.get('/user/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await userCollection.findOne(query);
  res.send(result);
})

 // Delete a user

 app.delete('/delete-user/:id',async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.deleteOne(query);
  res.send(result);
})
// UPDATE USER
app.put('/update-user/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
      $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.option,
          address: updatedUser.address,
          phone: updatedUser.phone,
          about: updatedUser.about,
          photoUrl: updatedUser.photoUrl,
          skills: updatedUser.skills ? updatedUser.skills : null,
      }
  }
  const result = await userCollection.updateOne(filter, updateDoc, options);
  res.send(result);
})

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

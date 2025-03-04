const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@skillgrow.auylm.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow`;

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



  // event section
  // Route to add a new event
app.post('/new-event', async (req, res) => {
  try {
    const newEvent = req.body;
    const result = await eventCollection.insertOne(newEvent);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error });
  }
});


// Get all events
app.get('/events', async (req, res) => {
  try {
    const result = await eventCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Get a specific event by ID
app.get('/event/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eventCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
});

// Update an event by ID
app.put('/event/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEvent = req.body;

    const result = await eventCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEvent }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});


// Delete an event by ID
app.delete('/event/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eventCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});



// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 9000;

// Middleware
app.use(cors());
app.use(express.json());


// database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@skillgrow.uo07a.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("skillgrow");
        const coursesCollection = database.collection("courses");


        //  Add a new course -(POST)
        app.post('/courses', async (req, res) => {
            const newCourse = req.body;
            const result = await coursesCollection.insertOne(newCourse);
            res.status(201).send(result);
        });

        //  Get all courses -(GET)
        app.get('/courses', async (req, res) => {
            const courses = await coursesCollection.find().toArray();
            res.status(200).send(courses);
        });

        //  Get a single course by ID- (GET)
        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const course = await coursesCollection.findOne({ _id: new ObjectId(id) });
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            res.status(200).send(course);
        });

        // Update a course by ID -(PUT)
        app.put('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const updatedCourse = req.body;

            const result = await coursesCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedCourse }
            );

            if (result.matchedCount === 0) {
                return res.status(404).send({ message: "Course not found" });
            }

            res.status(200).send({ message: "Course updated successfully", result });
        });

        // Delete a course by ID- (DELETE)
        app.delete('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const result = await coursesCollection.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(404).send({ message: "Course not found" });
            }

            res.status(200).send({ message: "Course deleted successfully" });
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('SkillGrow API is running...');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@skillgrow.auylm.mongodb.net/?retryWrites=true&w=majority&appName=skillgrow`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
    console.log('✅ Connected to MongoDB!');
  }
}

const database = client.db('skill-growdb');
const bookCollection = database.collection('books');
const courseCollection = database.collection('course');
const enrollmentCollection =  database.collection('enrollment');

const userCollection =  database.collection('user');


module.exports = {
  connectDB,
  client,
  ObjectId,
  bookCollection,
  courseCollection
}; 
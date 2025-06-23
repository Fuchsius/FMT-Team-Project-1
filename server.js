const express = require('express');
const cors = require('cors');
const app = express();
const booksRouter = require('./routes/api/books');
const courseRouter = require('./routes/api/course');
const authRouter = require('./routes/api/auth');
const enrollmentRouter = require('./routes/api/enrollment');
const { connectDB } = require('./models/db');

app.use(express.json());
app.use(cors());

app.use('/api/books', booksRouter);
app.use('/api/courses', courseRouter);
app.use('/api/auth', authRouter);
app.use('/api/enrollment', enrollmentRouter);

const PORT = process.env.PORT || 6610;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to DB:', err);
  process.exit(1);
}); 
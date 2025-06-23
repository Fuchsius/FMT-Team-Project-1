 📚 Project Backend Overview

This project includes full backend implementations for user authentication, course and book listings, and enrollment features, all connected to a MongoDB database and integrated with the frontend via APIs.
🔐 1. Login / Signup (Authentication)

-Features:** User registration and login
-Technology:** JWT (JSON Web Tokens) for secure authentication
-Database:** MongoDB (Users Collection)
-Frontend Integration:** Connected via `/api/auth.js` using `fetch()` from frontend pages like `login.html` and `signup.html`

📘 2. Shop Details (`shopdetails.html`)

-Features:** Displays all available books
-API Endpoint:** `/api/books.js`
-Database:** MongoDB (Books Collection)
-Frontend Integration:** Dynamically loads book data into `shopdetails.html` via API fetch

🎓 3. Course Details (`coursedetails.html`)

-Features:** Displays detailed course information
-API Endpoint:** `/api/course.js`
-Database:** MongoDB (Courses Collection)
-Frontend Integration:** Course data is fetched and rendered on `coursedetails.html` via the connected API

📝 4. Enrollment

- Features:** User enrollment into selected courses
- API Endpoint:** `/api/enrollment.js`
- Database:** MongoDB (Enrollment Collection)

✅ Tech Stack

-Backend:** Node.js, Express.js
-Database:** MongoDB with Mongoose
-Authentication:** JWT
-Frontend:** HTML, CSS, JavaScript (Fetch API)
-API Structure:** RESTful




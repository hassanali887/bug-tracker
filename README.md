# Bug Tracker App

A full-stack web application for logging and managing bugs in software projects. Built with the MERN stack (MongoDB, Express, React, Node.js) with JWT-based authentication.

## Why I Built This

I wanted to build something practical that covers all the core concepts of full-stack development. Not just a todo app, but something that actually makes sense in a real development environment. Bug tracking is something every software team uses, so it felt like a good project to work on.

## What It Does

- Register and log in securely
- Each user only sees their own bugs
- Report a new bug with a title, description, priority and status
- Update the status of a bug as you work on it (Open, In Progress, Resolved)
- Delete bugs that are no longer needed
- Dashboard shows a live summary of total bugs, open, in progress and resolved

## Tech Stack

**Backend**
- Node.js with Express for the REST API
- MongoDB Atlas with Mongoose for the database
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing

**Frontend**
- React with Vite
- React Router for client-side navigation
- Axios for HTTP requests

## Project Structure

```
bug-tracker/
├── backend/
│   ├── controllers/      # Business logic
│   ├── middleware/        # JWT auth middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   └── server.js          # Entry point
├── frontend/
│   └── src/
│       ├── pages/         # Login, Register, Dashboard
│       └── App.jsx        # Route definitions
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get token | No |
| GET | /api/bugs | Get all bugs for logged in user | Yes |
| POST | /api/bugs | Create a new bug | Yes |
| GET | /api/bugs/:id | Get a single bug | Yes |
| PUT | /api/bugs/:id | Update a bug | Yes |
| DELETE | /api/bugs/:id | Delete a bug | Yes |

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/hassanali887/bug-tracker.git
cd bug-tracker
```

**2. Set up the backend**
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend:
```bash
npm run dev
```

**3. Set up the frontend**
```bash
cd frontend
npm install
npm run dev
```

**4. Open the app**

Go to `http://localhost:5173` in your browser.

## What I Learned

This project taught me how all the pieces of a full-stack app actually connect. Writing the auth middleware from scratch helped me understand how JWT tokens work in practice, not just in theory. Connecting the React frontend to a live REST API, handling token storage and protected routes, made a lot of things click that did not before.

## Author

Hassan Ali, CS Master's student at Johannes Kepler University Linz  
GitHub: [@hassanali887](https://github.com/hassanali887)

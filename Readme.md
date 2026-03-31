# Real Estate Buyer Portal (TechKraft Assignment)

## Overview

This project is a simple full-stack buyer portal for a real estate broker.
It allows users to register, login, and manage their favourite properties.

The main focus of this assignment was to implement authentication, protected APIs, and a user-specific favourites system with proper backend–frontend integration.

---

## Live Demo

* **Frontend (Vercel):** https://real-state-broker.vercel.app
* **Backend (Render):** https://real-state-broker.onrender.com

> Note: Backend is hosted on Render free tier, so first request may take a few seconds.

---

## Features

* User registration and login (email + password)
* JWT-based authentication
* Protected routes (only authenticated users can access dashboard)
* View list of available properties
* Add / remove properties from favourites
* Each user can only access their own favourites
* Favourites persist across refresh, logout, and login
* Clean UI built with React and Tailwind CSS

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for authentication
* bcrypt for password hashing

---

## How to run locally

### 1. Clone the repository

```bash
git clone https://github.com/Subhamgtm15/real-state-broker.git
cd real-state-broker
```

---

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Example flow

1. Register a new user
2. Login with email and password
3. Access dashboard
4. Browse properties
5. Add properties to favourites
6. Switch to "Favourites" tab
7. Refresh or logout → login again → favourites remain saved

---

## API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Properties

* `GET /api/properties`
* `POST /api/properties/:id/favourite`
* `DELETE /api/properties/:id/favourite`
* `GET /api/properties/favourites/me`

---

## Security & Design Notes

* Passwords are hashed using bcrypt before storing
* JWT is used for authentication and route protection
* User-specific data is enforced using `req.user.id` from token
* Duplicate favourites are prevented at database level
* Backend validates input and handles errors properly

---

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

Environment variables are used for secure configuration across environments.

---

## Future Improvements

* Store properties in database instead of static file
* Add search, filtering, and sorting
* Add loading states and better UI feedback (toasts)
* Improve mobile responsiveness
* Add role-based access (admin features)

---

## Conclusion

This project demonstrates a complete full-stack workflow including authentication, protected APIs, database persistence, and deployment.

It reflects how a basic real-world application handles user-specific data securely and efficiently.

---

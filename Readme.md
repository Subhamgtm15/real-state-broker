# Real Estate Buyer Portal (TechKraft Assignment)

## Overview

This project is a simple buyer portal for a real estate broker.
It allows users to register, login, and manage their favourite properties.

The main goal was to implement authentication and a favourites system with proper backend and frontend integration.

---

## Features

* User registration and login (email + password)
* JWT-based authentication
* Protected routes (only logged-in users can access dashboard)
* View list of properties
* Add/remove properties to favourites
* Each user can only see their own favourites
* Favourites are stored in database (MongoDB)
* Basic UI with React + Tailwind

---

## Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for authentication
* bcrypt for password hashing

---

## How to run the project

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd project-folder
```

---

### 2. Backend setup

```bash
cd server
npm install
```

Make sure MongoDB is running locally:

```bash
mongodb://localhost:27017/real_estate_db
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
3. You will be redirected to dashboard
4. View all properties
5. Click "Add to Favourite"
6. Switch to "Favourites" tab to see saved properties
7. Logout and login again → favourites will still be there

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

## Notes

* Passwords are securely hashed using bcrypt
* JWT is used for authentication
* Users cannot access or modify other users’ favourites
* Favourites are persisted in MongoDB (not in-memory)

---

## Future Improvements

* Store properties in database instead of static file
* Add search and filtering
* Improve UI (animations, better feedback messages)

---

## Conclusion

This project demonstrates a basic full-stack workflow including authentication, protected APIs, database integration, and frontend interaction with backend services.

---

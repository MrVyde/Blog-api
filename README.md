# Blog API

A backend-only project for managing blog posts and comments, built with **Node.js**, **Express**, and **Prisma ORM**.  
The API supports JWT authentication and provides endpoints for creating, editing, publishing, and commenting on blog posts.

---

##  Deployment
Live API: [https://blog-api-k0tb.onrender.com](https://blog-api-k0tb.onrender.com)

---

##  Tech Stack
- Node.js  
- Express  
- Prisma ORM  
- JWT Authentication  

---

##  Installation &  Usage
git clone https://github.com/your-username/blog_api.git
cd blog_api
npm install
npm run dev

The API will be available at http://localhost:3000.

## Authentication

JWT-based authentication is required for protected routes.Attach token in requests via:

Authorization: Bearer <token>

## Features

Create, edit, publish/unpublish blog posts

Add and manage comments

User model for authors and readers

Protected routes for post management

## Endpoints

POST /auth/login – Authenticate user and receive JWT

GET /posts – Fetch all published posts

POST /posts – Create new post (auth required)

PUT /posts/:id – Edit or publish/unpublish post (auth required)

DELETE /comments/:id – Manage comments (auth required)

(Full endpoint documentation can be added here if required.)
# Blog API

A REST API built with Node.js, Express, and Prisma ORM that powers a full-stack blogging platform consisting of a public blog frontend and an admin dashboard.

## Live API

https://blog-api-k0tb.onrender.com

## Project Ecosystem

```text
Blog Platform
├── Blog Frontend (Public Site)
├── Blog Admin (Content Management)
└── Blog API (Backend)
```

## Features

* JWT-based authentication
* Protected admin routes and authorization
* Create, edit, publish, and unpublish blog posts
* Comment management system
* Public comment submission with rate limiting
* Input validation using express-validator
* Centralized error handling middleware
* CORS configuration for multiple frontend clients
* Prisma ORM database integration with Supabase

## Tech Stack

* Node.js
* Express
* TypeScript
* Prisma ORM
* Supabase (PostgreSQL)
* JWT Authentication
* express-validator
* REST API

## Architecture

The API serves as the central backend for both frontend applications.

* Deployed on Render
* Database hosted on Supabase
* Prisma ORM for database access
* JWT authentication for admin access
* Middleware-based architecture for validation, authentication, and error handling
* CORS configuration for multiple frontend clients

### Connected Applications

* Public Blog Frontend
  https://github.com/MrVyde/Blog-frontend

* Admin Dashboard
  https://github.com/MrVyde/Blog-admin

The API handles authentication, content management, comment moderation, validation, and communication between deployed frontend applications.

## Security & Middleware

* JWT authentication for protected routes
* Input validation using express-validator (posts, comments, auth)
* Rate limiting on comment submissions to prevent spam
* Centralized error handling middleware
* CORS restricted to trusted frontend domains
* Environment variables for sensitive configuration

## What This Project Demonstrates

* REST API design and architecture
* JWT authentication and authorization
* Middleware-driven backend structure
* Input validation using express-validator
* Rate limiting and abuse prevention
* Prisma ORM with Supabase (PostgreSQL)
* Secure environment variable management
* Cross-origin communication (CORS)
* Error handling and clean API responses
* Full-stack system design (Frontend + Admin + API)

## Authentication

Protected routes require a valid JWT.

```http 
Authorization: Bearer <token>
```

## Key Endpoints

### Authentication

```http 
POST /api/auth/login
```

Authenticate an admin user and receive a JWT.

### Posts

```http 
GET /api/posts
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id
```

Manage blog posts and publication status.

### Comments

```http 
GET /api/comments
POST /api/comments
DELETE /api/comments/:id
```

Create and manage comments.

## Environment Variables

```env 
DATABASE_URL=
JWT_SECRET=
PORT=
```

## Local Setup

Clone the repository:

```bash 
git clone https://github.com/MrVyde/Blog-api.git
cd Blog-api
```

Install dependencies:

```bash 
npm install
```

Create environment variables:

```env 
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

Run the development server:

```bash 
npm run dev
```

The API will be available at:

```text 
http://localhost:3000
```

## Related Projects

* Frontend: https://github.com/MrVyde/Blog-frontend
* Admin Dashboard: https://github.com/MrVyde/Blog-admin

## Repository

https://github.com/MrVyde/Blog-api

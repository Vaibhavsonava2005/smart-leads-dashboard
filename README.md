# Smart Leads Dashboard - Developed by Vaibhav Sonava

A production-grade, high-performance Customer Relationship Management (CRM) dashboard tailored for managing leads. Built for **ServiceHive**, this application demonstrates a mastery of the MERN stack using strict TypeScript on both the client and server sides.

## 🚀 Project Overview

The Smart Leads Dashboard allows sales teams to track, filter, and manage incoming leads with high efficiency. It supports robust Role-Based Access Control (RBAC), allowing Administrators full CRUD capabilities while limiting Sales Users to essential operations. 

## ✨ Features

- **Authentication & RBAC**: Secure JWT-based authentication with Admin and Sales roles.
- **High-Performance Lead Filtering**: Backend pagination (skip/limit), sorting (latest/oldest), and debounced multi-field searching optimized for large datasets.
- **Real-Time Search**: Frontend implemented with a custom `useDebounce` hook to minimize unnecessary API calls.
- **CSV Export**: Direct-to-download CSV generation for data portability.
- **Responsive & Premium UI**: Built with TailwindCSS and Lucide React, featuring empty states, loading skeletons, and strict visual hierarchy.

## 🛠️ Tech Stack

### Frontend
- **React (Vite) + TypeScript**: Strict typings for all props, states, and API responses.
- **TailwindCSS**: Utility-first styling for rapid, consistent UI development.
- **Zustand**: Lightweight, persistent global state management for authentication.
- **TanStack Query (React Query)**: Powerful server-state management with automatic caching and refetching.
- **Axios**: Configured with global interceptors for JWT injection and 401 handling.

### Backend
- **Node.js + Express + TypeScript**: Scalable controller-service-route architecture.
- **MongoDB + Mongoose**: Document database with text indexes for `$regex` search optimization.
- **Zod**: Runtime schema validation for robust API boundary security.
- **JWT + bcryptjs**: Industry-standard stateless authentication and password hashing.

## 🏗️ Design Decisions

### Why TypeScript everywhere?
Using TypeScript across the entire stack drastically reduces runtime errors by catching type mismatches at compile time. By sharing interfaces (like `ILead` and `UserRole`) conceptually between the client and server, the data contract is solidified, making the application inherently more stable and maintainable as the team scales.

### Why strict Controller-Service architecture?
Instead of dumping all logic into route handlers (express boilerplate), I separated concerns:
- **Routes**: Define endpoints and apply middleware.
- **Controllers**: Handle HTTP requests, extract parameters, and return responses.
- **Services**: Contain the core business logic (e.g., dynamic MongoDB query building for filters).
This makes unit testing easier and keeps the codebase modular.

### Why Zustand instead of Redux?
For this application, the only truly global client state is the authenticated user's session. Redux would introduce unnecessary boilerplate. Zustand provides a simple, hook-based API with built-in persistence to `localStorage` (via middleware), perfectly fitting this use case.

## 🐳 Docker Setup

This project is fully containerized for seamless development and deployment.

1. Ensure Docker Desktop is running.
2. From the root directory, run:
   ```bash
   docker-compose up --build
   ```
3. The application will spin up:
   - Frontend: `http://localhost:80`
   - Backend API: `http://localhost:5000`
   - MongoDB: Port `27017`

## 💻 Local Setup (Without Docker)

### Backend
```bash
cd server
npm install
# Set your MONGO_URI and JWT_SECRET in server/.env
npm run dev # or npx tsc && node dist/server.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---
*Built with ❤️ by Vaibhav Sonava*

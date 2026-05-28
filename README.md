# Student-Hostel Portal

A full-stack web application connecting students with hostel admins. Built with React (Vite), Node.js, Express, and MongoDB.

## Features

### Student Features
- Register and login
- View all available hostels
- View hostel details
- Apply for hostels
- Track application status (Pending/Accepted/Rejected)

### Admin Features
- Register and login
- Add new hostels
- View all applications for their hostels
- Accept or reject student applications

## Tech Stack

**Frontend:** React, Vite, React Router, CSS
**Backend:** Node.js, Express, MongoDB, Mongoose
**Authentication:** JWT

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hostel-portal
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

4. Make sure MongoDB is running on your system

5. Start the backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd fronted
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- POST `/api/auth/student/register` - Student registration
- POST `/api/auth/student/login` - Student login
- POST `/api/auth/admin/register` - Admin registration
- POST `/api/auth/admin/login` - Admin login

### Hostels
- GET `/api/hostels` - Get all hostels
- GET `/api/hostels/:id` - Get hostel by ID
- POST `/api/hostels` - Create hostel (Admin only)

### Applications
- POST `/api/applications` - Create application (Student only)
- GET `/api/applications/student/my-applications` - Get student's applications
- GET `/api/applications/admin/applications` - Get admin's hostel applications
- PATCH `/api/applications/:id/status` - Update application status (Admin only)

## Usage

1. Register as a student or admin
2. Students can browse hostels and apply
3. Admins can add hostels and manage applications
4. Track application status in real-time

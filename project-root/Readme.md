# Event-Driven Notification Dispatcher

## Project Overview

The **Event-Driven Notification Dispatcher** is a lightweight asynchronous notification system built using **Node.js**, **Express.js**, and **SQLite**.

The application exposes a REST API that accepts business events (such as `order_placed`), stores them in a SQLite database, creates a notification task, pushes it into an in-memory queue, and immediately returns an **HTTP 202 Accepted** response. A background worker then processes the notification asynchronously without blocking the API response.

This project was developed as part of the **Backend Engineering Technical Assessment**.

---

# Live Deployment

The application has been successfully deployed on **Render**.

### Live Application

https://kovon-notification-dispatcher.onrender.com

### API Endpoint

```
POST https://kovon-notification-dispatcher.onrender.com/api/v1/events
```

### Sample Request

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

### Expected Response

HTTP Status

```
202 Accepted
```

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

---

# Render Deployment Note

This project is deployed using **Render's Free Web Service**.

Render automatically spins down inactive free instances after a period of inactivity.

**Important:**

- The first request after inactivity may take **30–60 seconds** (approximately **50 seconds**) while the service starts.
- Once the application becomes active, all subsequent requests are processed normally with low latency until the instance becomes inactive again.
- This startup delay is a limitation of the free hosting plan and is **not related to the application itself**.

For uninterrupted availability and instant startup, Render's paid plans or another always-on hosting service can be used.

---

# Tech Stack

- Node.js
- Express.js
- SQLite
- sqlite3
- JavaScript (ES6)

---

# Features

- RESTful API using Express.js
- SQLite database
- Event persistence
- Notification persistence
- In-memory asynchronous queue
- Background queue worker
- Immediate HTTP 202 response
- Asynchronous notification processing
- Random notification delivery simulation
- 10% simulated failure rate
- Automatic retry count increment
- Proper request validation
- Error handling
- Production deployment on Render

---

# Project Structure

```
project-root/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── controllers/
│   │     └── eventController.js
│   │
│   ├── routes/
│   │     └── eventRoutes.js
│   │
│   ├── services/
│   │     ├── eventService.js
│   │     ├── notificationService.js
│   │     └── queueWorker.js
│   │
│   └── db/
│         ├── database.js
│         └── schema.sql
│
├── architecture-diagram.pdf
├── package.json
├── package-lock.json
├── README.md
├── .env.example
└── .gitignore
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/rajakarthikeya-137/kovon_Notification-Dispatcher-.git
```

Navigate into the project

```bash
cd kovon_Notification-Dispatcher-
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
PORT=3000
DB_NAME=notification.db
```

---

# Running the Application

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

The application will start on

```
http://localhost:3000
```

---

# SQLite Database

The SQLite database file

```
notification.db
```

is automatically generated during the first application startup.

The application creates the following tables automatically:

- events
- notifications

No manual database setup is required.

---

# API Documentation

## Endpoint

```
POST /api/v1/events
```

### Request Body

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

### Success Response

HTTP Status

```
202 Accepted
```

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

### Error Response

HTTP Status

```
400 Bad Request
```

```json
{
  "error": "event_type and recipient are required"
}
```

---

# Queue Processing Workflow

1. Client sends an event request.
2. Request is validated.
3. Event is stored in the SQLite **events** table.
4. Notification is created in the **notifications** table with **pending** status.
5. Notification task is pushed into the in-memory queue.
6. API immediately returns **HTTP 202 Accepted**.
7. Background worker processes the queue asynchronously.
8. Notification sending is simulated with a random delay between **500–1000 ms**.
9. A **10% failure rate** is simulated.
10. Notification status is updated to:
   - completed
   - failed
11. `retry_count` is incremented for failed notifications.

---

# Architecture Flow

```
Client
   │
   ▼
POST /api/v1/events
   │
   ▼
Express API
   │
   ▼
Validate Request
   │
   ▼
Store Event (SQLite)
   │
   ▼
Create Notification (Pending)
   │
   ▼
Push to In-Memory Queue
   │
   ▼
Return HTTP 202 Accepted
   │
   ▼
Background Queue Worker
   │
   ▼
Simulate Notification
(500–1000 ms)
   │
   ▼
Update Status
Completed / Failed
```

---

# Error Handling

The application gracefully handles:

- Missing `event_type`
- Missing `recipient`
- Invalid JSON payload
- SQLite insertion failures
- Queue processing failures
- Notification update failures
- Internal server errors

---

# Deployment Environment

**Hosting Platform:** Render

**Runtime:** Node.js

**Database:** SQLite

**Build Command**

```bash
npm install
```

**Start Command**

```bash
npm start
```

---

# SQLite on Render

This assessment requires SQLite.

SQLite stores its data locally inside the application.

Since the application is deployed on **Render Free Web Service**, the SQLite database resides on Render's local filesystem.

Therefore:

- The application works normally while running.
- Database contents may reset after a redeployment or instance restart.
- This behavior is expected for SQLite on ephemeral cloud environments.

In a production system, a managed database such as **PostgreSQL** or **MySQL** would be recommended.

---

# Assumptions

- Notification channel is fixed to **email**.
- Notification delivery is simulated using `setTimeout()`.
- Queue implementation uses an in-memory JavaScript array.
- SQLite is used as required by the assessment.

---

# Future Enhancements

- PostgreSQL integration
- Redis/BullMQ message queue
- Real email service (SendGrid/Nodemailer)
- Authentication & Authorization
- Docker support
- Logging & Monitoring
- Automated unit and integration testing
- Queue persistence

---

# Author

**ANNEM SURENDRA RAJA KARTHIKEYA**

Backend Engineering Technical Assessment Submission

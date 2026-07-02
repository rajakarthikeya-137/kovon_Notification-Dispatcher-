# Event-Driven Notification Dispatcher

## Project Overview

This project is a lightweight asynchronous notification system built using **Node.js**, **Express.js**, and **SQLite**.

The application accepts business events through a REST API, stores them in a SQLite database, creates a notification task, pushes it into an in-memory queue, and immediately returns a **202 Accepted** response. A background worker processes notifications asynchronously and updates their status in the database.

---

# Tech Stack

- Node.js
- Express.js
- SQLite
- sqlite3
- JavaScript

---

# Features

- REST API using Express.js
- SQLite database
- Event storage
- Notification storage
- In-memory asynchronous queue
- Background worker
- Immediate HTTP 202 response
- Request validation
- Error handling
- Retry count on failed notifications

---

# Project Structure

```
project-root/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   │      eventController.js
│   ├── routes/
│   │      eventRoutes.js
│   ├── services/
│   │      eventService.js
│   │      notificationService.js
│   │      queueWorker.js
│   ├── db/
│   │      database.js
│   │      schema.sql
│
├── package.json
├── README.md
├── .env.example
└── notification.db (generated automatically)
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

Move into the project

```bash
cd project-root
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example

```env
PORT=3000
DB_NAME=notification.db
```

---

# Running Locally

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The application will run at

```
http://localhost:3000
```

---

# SQLite Database

The database file

```
notification.db
```

is automatically created on the first run.

The project uses two SQLite tables:

- events
- notifications

No manual database setup is required.

---

# API Endpoint

## POST

```
/api/v1/events
```

### Sample Request

```json
{
    "event_type":"order_placed",
    "recipient":"user@example.com",
    "data":{
        "order_id":101
    }
}
```

### Sample Response

Status

```
202 Accepted
```

```json
{
    "message":"Event accepted for processing",
    "tracking_id":1,
    "notification_id":1,
    "status":"pending"
}
```

---

# Queue Processing

When a request is received:

1. Validate request.
2. Store the event in the SQLite **events** table.
3. Create a notification in the **notifications** table with **pending** status.
4. Push the notification task into an in-memory queue.
5. Return **202 Accepted** immediately.
6. Background worker processes the queue.
7. Simulate notification sending using a random delay between **500–1000 ms**.
8. Simulate a **10% failure rate**.
9. Update the notification status to **completed** or **failed**.
10. Increment **retry_count** if notification delivery fails.

---

# Error Handling

The application handles:

- Missing event_type
- Missing recipient
- Invalid JSON payload
- Database insert failure
- Queue processing failure
- Notification update failure
- Internal server errors

---

# Running on Render

This application can also be deployed on **Render** as a Node.js Web Service.

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

Once deployed, the API will be available at

```
https://your-render-service.onrender.com/api/v1/events
```

instead of

```
http://localhost:3000/api/v1/events
```

---

# Important Note About SQLite on Render

This project uses **SQLite** because it is required for the assessment.

SQLite stores data in a local database file (`notification.db`).

When deployed on **Render**, the application works correctly, but the SQLite database is stored on Render's local filesystem, which is **not persistent**.

This means:

- The application functions normally while running.
- Data may be lost after a redeployment or service restart.
- This behavior is expected when using SQLite on Render.

For production deployments, a persistent database such as **PostgreSQL** or **MySQL** should be used instead of SQLite.

---

# Assumptions

- Notification channel is fixed as **email**.
- Notification sending is simulated using `setTimeout()`.
- Queue is implemented using an in-memory JavaScript array.
- SQLite is used as required by the assessment.

---

# Future Improvements

- PostgreSQL database
- Redis/BullMQ queue
- Real email integration (SendGrid/Nodemailer)
- Authentication
- Docker support
- Logging
- Unit tests

---

# Author

ANNEM SURENDRA RAJA KARTHIKEYA
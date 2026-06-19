# 🎬 Movie Ticket Booking System

A full-stack Movie Ticket Booking System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

Users can browse events, select seats, reserve seats, and confirm bookings with protection against double booking.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Events

- View All Events
- Event Details Page
- Movie Poster Support
- Venue Information
- Event Date & Time

### Seat Booking

- Dynamic Seat Layout
- Seat Selection
- Reserve Seats
- Confirm Booking

### Seat Status

| Status | Color |
|----------|----------|
| Available | 🟩 Green |
| Reserved | 🟨 Yellow |
| Booked | 🟥 Red |
| Selected | 🟦 Blue |

### Reservation Management

- Prevents Double Booking
- Atomic Seat Locking using MongoDB
- Reservation Expiry System
- Automatic Seat Release after Expiry

### UI

- Modern Tailwind CSS Design
- Responsive Layout
- Component-Based Architecture
- Mobile Friendly

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## 📂 Project Structure

```bash
frontend/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Events.jsx
│   └── EventDetails.jsx
│
├── components/
│   ├── EventCard.jsx
│   ├── EventList.jsx
│   ├── EventHeader.jsx
│   ├── SeatGrid.jsx
│   ├── SeatCard.jsx
│   ├── BookingActions.jsx
│   └── SeatLegend.jsx
│
└── services/
    └── api.js
```

```bash
backend/
│
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── reservationController.js
│   └── bookingController.js
│
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Seat.js
│   ├── Reservation.js
│   └── Booking.js
│
├── routes/
│
└── jobs/
    └── reservationCleanup.js
```

---

## 🔄 Booking Flow

```text
User Login
      ↓
Select Event
      ↓
Select Seats
      ↓
Reserve Seats
      ↓
Seat Status = Reserved
      ↓
Confirm Booking
      ↓
Seat Status = Booked
```

---

## 🔒 Double Booking Prevention

The application prevents race conditions and double booking using MongoDB atomic operations.

```JavaScript
Seat.findOneAndUpdate(
  {
    eventId,
    seatNumber,
    status: "available"
  },
  {
    status: "reserved"
  }
)
```

Only one user can reserve a seat at a time.

---

## ⚡ Reservation Expiry

Reserved seats automatically become available again if the user does not complete the booking within the reservation window.

```text
Reserved
    ↓
Reservation Expired
    ↓
Available Again
```

---

## 🎯 Future Improvements

- Payment Gateway Integration
- Admin Dashboard
- Real-time Seat Updates using Socket.IO
- Email Notifications
- Movie Categories
- Search & Filters
- Booking History
- QR Ticket Generation

---

## 🧑‍💻 Installation

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
PORT=9000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 🎯 Future Improvements

- Payment Gateway Integration
- Admin Dashboard
- Real-time Seat Updates using Socket.IO
- Email Notifications
- Movie Categories
- Search & Filters
- Booking History
- QR Ticket Generation

---

## 👨‍💻 Author

Rameshwar Patil

Built as a MERN Stack Internship Assignment Project.

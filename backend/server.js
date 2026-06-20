const express = require("express");
const app = express();
cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const seatRoutes = require("./routes/seatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const startReservationCleanup = require("./jobs/reservationCleanup");
require("dotenv").config();

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/bookings", bookingRoutes);

startReservationCleanup();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

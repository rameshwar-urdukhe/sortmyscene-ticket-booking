const Reservation = require("../models/Reservation");
const Seat = require("../models/Seat");

const reserveSeats = async (req, res) => {
  try {
    const { userId, eventId, seatNumbers } = req.body;

    const lockedSeats = [];

    for (const seatNumber of seatNumbers) {
      const seat = await Seat.findOneAndUpdate(
        {
          eventId,
          seatNumber,
          status: "available",
        },
        {
          status: "reserved",
        },
        {
          new: true,
        },
      );

      if (!seat) {
        return res.status(400).json({
          success: false,
          message: `${seatNumber} already reserved`,
        });
      }

      lockedSeats.push(seat);
    }

    const reservation = await Reservation.create({
      userId,
      eventId,
      seatNumbers,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    res.status(201).json({
      success: true,
      message: "Seats reserved successfully",
      reservationId: reservation._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  reserveSeats,
};

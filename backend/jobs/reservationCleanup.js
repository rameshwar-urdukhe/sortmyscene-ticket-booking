const Reservation = require("../models/Reservation");
const Seat = require("../models/Seat");

const startReservationCleanup = () => {
  setInterval(async () => {
    try {
      console.log("Checking expired reservations...");

      const expiredReservations = await Reservation.find({
        expiresAt: { $lt: new Date() },
      });

      for (const reservation of expiredReservations) {
        await Seat.updateMany(
          {
            eventId: reservation.eventId,
            seatNumber: {
              $in: reservation.seatNumbers,
            },
          },
          {
            status: "available",
          },
        );

        await Reservation.findByIdAndDelete(reservation._id);

        console.log(`Released seats for reservation ${reservation._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, 60000); // every 1 minute
};

module.exports = startReservationCleanup;

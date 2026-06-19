const Event = require("../models/Event");
const Seat = require("../models/Seat");

const createEvent = async (req, res) => {
  try {
    const { title, description, imageUrl, venue, eventDate } = req.body;

    const event = await Event.create({
      title,
      description,
      imageUrl,
      venue,
      eventDate,
    });

    const seats = [];

    const rows = ["A", "B", "C"];

    rows.forEach((row) => {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          eventId: event._id,
          seatNumber: `${row}${i}`,
        });
      }
    });

    await Seat.insertMany(seats);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
      seatsCreated: seats.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvent,
};

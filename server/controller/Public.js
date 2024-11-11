const GuestSpeaker = require('../models/GuestSpeaker');
const Event = require('../models/Event');

const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } });
    return res.status(200).json(upcomingEvents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching upcoming events' });
  }
};


const getPastEvents = async (req, res) => {
  try {
    const pastEvents = await Event.find({ date: { $lt: new Date() } });
    return res.status(200).json(pastEvents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching past events' });
  }
};


const getAllGuestSpeakers = async (req, res) => {
  try {
    const guestSpeakers = await GuestSpeaker.find();
    return res.status(200).json(guestSpeakers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching guest speakers' });
  }
};

module.exports = { getUpcomingEvents, getPastEvents, getAllGuestSpeakers };

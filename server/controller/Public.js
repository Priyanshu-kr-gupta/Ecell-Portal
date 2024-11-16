const Event = require('../models/Event');
const TeamMember= require('../models/Team')
const GuestSpeaker = require('../models/GuestSpeaker');

const getUpcomingEvents = async (req, res) => {
  try {
    const page = parseInt(req.body.currentPage) || 1;
    const limit = 6;
    const upcomingEvents = await Event.find({
      expectedDate: { $gte: new Date() },
    })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalEvents = await Event.countDocuments({
      expectedDate: { $gte: new Date() },
    });
    const totalPages = Math.ceil(totalEvents / limit);
    return res.status(200).json({
      upcomingEvents,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching upcoming events" });
  }
};

const getPastEvents = async (req, res) => {
  try {
    const page = parseInt(req.body.currentPage) || 1;
    const limit = 6;

    const upcomingEvents = await Event.find({
      expectedDate: { $lt: new Date() },
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalEvents = await Event.countDocuments({
      expectedDate: { $lt: new Date() },
    });
    const totalPages = Math.ceil(totalEvents / limit);
    return res.status(200).json({
      upcomingEvents,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching upcoming events" });
  }
};

const getParticularEvent = async (req, res) => {
  const { id } = req.body;
  try {
    const event = await Event.findById({ _id: id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllGuestSpeakers = async (req, res) => {
  try {
    const page = parseInt(req.body.currentPage) || 1;
    const limit = 6;

    const guestSpeakers = await GuestSpeaker.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalGuestSpeakers = await GuestSpeaker.countDocuments();
    const totalPages = Math.ceil(totalGuestSpeakers / limit);
    return res.status(200).json({
      guestSpeakers,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching guest speakers" });
  }
};

const getObjectCount = async (req, res) => {
  try {
    const { modelName } = req.body;

    const models = {
      Event,
      GuestSpeaker,
      TeamMember,
    };

    if (modelName === 'Event') {
      const upcomingEvents = await Event.countDocuments({
        expectedDate: { $gte: new Date() },
      });
      const passedEvents = await Event.countDocuments({
        expectedDate: { $lt: new Date() },
      });

      return res.status(200).json({
        upcoming: upcomingEvents,
        passed: passedEvents,
      });
    }

    const Model = models[modelName];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid model name' });
    }

    const count = await Model.countDocuments({});
    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error while counting objects',
    });
  }
};


const getTeamMember = async(req,res)=>{
  const { designation } = req.body;
  try {
    const teamMembers = await TeamMember.find({ designation });
    res.json({teamMembers});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
}
module.exports = { getUpcomingEvents, getPastEvents, getAllGuestSpeakers, getObjectCount ,getParticularEvent,getTeamMember};

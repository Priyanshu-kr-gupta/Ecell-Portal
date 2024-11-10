const GuestSpeaker = require('../models/GuestSpeaker');
const Event = require('../models/Event');

const getAllEvent =  async (req,res)=>{
    try {
        const events = await Event.find(); 
        return res.status(200).json({
          success: true,
          message: 'Events fetched successfully',
          events
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ 
          success: false,
          message: 'Server error while fetching events' });
      }
}


const getAllGuestSpeakwer =  async (req,res)=>{
    try {
        const guestSpeakers = await GuestSpeaker.find(); 
        return res.status(200).json({
          success: true,
          message: 'Guest Speakers fetched successfully',
          guestSpeakers
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching guest speakers' }); 
      }
}

module.exports={getAllEvent,getAllGuestSpeakwer}

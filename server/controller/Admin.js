



const Event = require('../models/Event');
const GuestSpeaker = require('../models/GuestSpeaker');
const { uploadOnCloudinary, uploadMultipleImages } = require('../utils/cloudinary');

// Controller to add a new event with banner and gallery images
const addEvent = async (req, res) => {
    try {
        const { name, intro, description } = req.body;
        // Upload banner image
        const bannerImagePath = req.files.banner[0].path;
        const bannerUrl = await uploadOnCloudinary(bannerImagePath);
        
        // Create and save a new event with only the banner image
        const savedEvent = await Event.create({
            name,
            intro,
            description,
            banner: bannerUrl,
            gallery: []  // Empty array for gallery (this can be updated later)
        });

        res.status(201).json({
            message: 'Event added successfully',
            event: savedEvent
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add event',
            error: error.message
        });
    }
};

 const addGalleryImg = async (req,res)=>{
    try {
        const {id} = req.params;
        const event = Event.findById(id);
        const imgPath = req.file.path;
        console.log(imgPath)
        if(!imgPath){
            return res.json({
                success:false,
                message:"No gallery img found"
            })
        }
        const imgUrl = await uploadOnCloudinary(imgPath);

        await event.updateOne({
            $push:{gallery:imgUrl}
        })
       
        res.status(201).json({
            success:true,
            message:"Image upload Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
 }




const removeEvent = async (req, res) => {

    try{
        const eventId = req.params.id;

        // Find the event by ID and remove it
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event removed successfully' });

    }
    catch(error){
        res.status(500).json({ message: 'Failed to remove event', error: error.message });
    }
}


const addGuestSpeaker = async (req, res) => {
   
    try {
        const {name, intro, about} = req.body;
        if(!name || !intro || !about){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const imagePath = req.file.path;
        // console.log("Image Path:", imagePath);
        if(!imagePath){
            return res.status(400).json({message:"Please upload an image"});
        }
        // upload the img to cloudinary
        const avatarUrl = await uploadOnCloudinary(imagePath);
        const guestSpeaker = new GuestSpeaker({
            name,
            intro,
            about,
            avatar: avatarUrl
        });

        const savedGuestSpeaker = await guestSpeaker.save();

        res.status(201).json({
            message: 'Guest Speaker added successfully',
            guestSpeaker: savedGuestSpeaker
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add guest speaker',
            error: error.message
        });
        
    }
}


const removeGuestSpeaker = async (req, res) => {

    try{
        const guestSpeakerId = req.params.id;

        // Find the guest speaker by ID and remove it
        const deletedGuestSpeaker = await GuestSpeaker.findByIdAndDelete(guestSpeakerId);

        if (!deletedGuestSpeaker) {
            return res.status(404).json({ message: 'Guest Speaker not found' });
        }

        res.status(200).json({ message: 'Guest Speaker removed successfully' });

    }
    
    catch(error){
        res.status(500).json({ message: 'Failed to remove guest speaker', error: error.message });
    }
}


// Export admin endpoints
module.exports={addEvent, addGalleryImg , addGuestSpeaker,removeEvent,removeGuestSpeaker}


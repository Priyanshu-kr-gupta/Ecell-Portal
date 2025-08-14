const { Parser } = require('json2csv');
const Event = require('../models/Event');
const GuestSpeaker = require('../models/GuestSpeaker');
const TeamMember= require('../models/Team')
const Response = require('../models/Response');  
const EcellForm = require('../models/EcellForm')
const User = require('../models/User')
const { uploadOnCloudinary, uploadMultipleImages } = require('../utils/cloudinary');
const Startup = require('../models/Startup');

const addEvent = async (req, res) => {
    try {
        const { name, intro, description,expectedDate } = req.body;
        // Upload banner image
        const bannerImagePath = req.files.banner[0].path;
        const bannerUrl = await uploadOnCloudinary(bannerImagePath);
        
        // Create and save a new event with only the banner image
        const savedEvent = await Event.create({
            name,
            intro,
            description,
            banner: bannerUrl,
            expectedDate:expectedDate,
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

const addGalleryImg = async (req, res) => {
    try {
      const { eventId } = req.body; // Ensure `eventId` is received properly
      const event = await Event.findById(eventId); // Await here to ensure the database query completes
  
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }
  
      const imgPath = req.file?.path;
      if (!imgPath) {
        return res.json({
          success: false,
          message: "No gallery image found",
        });
      }
  
      // Upload the image to Cloudinary
      const imgUrl = await uploadOnCloudinary(imgPath);
  
      // Push the new image URL into the gallery array of the event
      await event.updateOne({
        $push: { gallery: imgUrl },
      });
  
      res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

  const addTeamMember = async (req, res) => {
    try {
      const { name, designation, email, linkedin } = req.body;
  
      const profileImagePath = req.file?.path;
      let profileUrl = null;
      
      if (profileImagePath) {
        profileUrl = await uploadOnCloudinary(profileImagePath);
      } else {
        return res.status(400).json({
          success: false,
          message: "Profile image is required",
        });
      }
  
      const savedTeamMember = await TeamMember.create({
        name,
        designation,
        email,
        linkedin,
        image: profileUrl, 
      });
  
      res.status(201).json({
        success: true,
        message: 'Team member added successfully',
     
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        message: 'Failed to add team member',
        error: error.message,
      });
    }
  };
  
  const addGuestSpeaker = async (req, res) => {
   
    try {
        const {name, intro, about , linkedin} = req.body;
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
            avatar: avatarUrl,
            linkedin
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


const deleteDocument = async (req, res) => {
  try {
    const { modelName, id ,imgPath } = req.body;
    // console.log(imgPath)
    const models = {
      Event,
      GuestSpeaker,
      TeamMember,
      EcellForm
    
    };

    const Model = models[modelName];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid model name' });
    }

    const deletedDocument = await Model.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: `${modelName} not found` });
    }

    res.status(200).json({ message: `${modelName} removed successfully` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to remove document', error: error.message });
  }
};


const createForm = async(req,res)=>{
  try {
    const { title, description, questions } = req.body;
    const newForm = new EcellForm({
      title,
      description,
      questions,
    });
    const savedForm = await newForm.save();
    res.status(201).json({
      message: 'Form created successfully.',
      form: savedForm,
    });
  } catch (error) {
    console.error('Error creating form:', error.message);
    res.status(500).json({ error: 'An error occurred while creating the form.' });
  }

}

const getForms = async (req, res) => {
  try {
    const forms = await EcellForm.find().select('_id title description');
    res.status(200).json({ forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

const addNotice = async(req,res) =>{
  try {
    
  } catch (error) {
    
  }
}

const getAllStartups = async (req, res) => {
  try {
      const startups = await Startup.find()
          .populate({
              path: 'user',
              select: '-Role' 
          });

      res.status(200).json({
          success: true,
          data: startups
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Server Error'
      });
  }
};


const getForm = async (req, res) => {
  try {
    const {formId}=req.body;
    const form = await EcellForm.find({_id:formId});
    res.status(200).json({ form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

const updateEndDate = async (req, res) => {

  const { formId } = req.params;
  const { endDate } = req.body;
  try {
    const updatedForm = await EcellForm.updateOne(
      { _id: formId },
      { $set: { endDate: endDate } },
    );
    res.status(200).json({ message: 'End date updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update end date' });
  }
};


const togglePublish = async (req, res) => {
  const { formId } = req.params;
  const { isPublished } = req.body; 
  try {
    const updatedForm = await EcellForm.updateOne(
      { _id: formId },
      { $set: { isPublished } }
    );
    res.status(200).json({ message: 'Form publish status updated successfully' });
  } catch (error) {
    console.error('Error updating publish status:', error);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
};





const getResponses = async (req, res) => {
  const { formId, page = 1 } = req.body;
  const perPage = 10; 

  try {
    const responses = await Response.find({ formId })
      .skip((page - 1) * perPage)  
      .limit(perPage)             
      .populate('userId','Name Email Reg_No Contact_No')  
      .exec();

    const hasMore = responses.length === perPage;
    res.json({
      responses,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};


const exportResponses = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await EcellForm.findById(formId).lean();
    if (!form) return res.status(404).send('Form not found');

    const responses = await Response.find({ formId })
      .populate('userId', 'Name Email Reg_No Contact_No')
      .lean();

    const questionColumns = form.questions.map((q) => q.text);
    const rows = responses.map((r) => {
      const row = {
        Name: r.userId.Name,
        Email: r.userId.Email,
        Reg_No: r.userId.Reg_No,
        Contact_No: r.userId.Contact_No,
        SubmittedAt: r.submittedAt.toISOString(),
      };

      form.questions.forEach((q) => {
        const answer = r.answers.find((a) => q._id.equals(a.questionId));
        row[q.text] = answer ? answer.answer : '[No Answer]';
      });

      return row;
    });

    const fields = ['Name', 'Email', 'Reg_No', 'Contact_No', 'SubmittedAt', ...questionColumns];
    const csv = new Parser({ fields }).parse(rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="responses-${formId}.csv"`
    );
    res.send(csv);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error exporting responses');
  }
};



module.exports={addEvent, addGalleryImg,addGuestSpeaker,addTeamMember,deleteDocument,createForm,getForms,getForm,
                  updateEndDate,togglePublish,addNotice,getResponses,exportResponses,getAllStartups}




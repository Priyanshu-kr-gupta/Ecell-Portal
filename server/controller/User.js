const Startup = require("../models/Startup");

const checkStartupRegistration = async (req, res) => {
    try {
        const {userId} = req.body;
        const existingStartup = await Startup.findOne({ user: userId });

        if (existingStartup) {
            return res.status(200).json({ registered: true,startup:existingStartup});
        } else {
            return res.status(200).json({ registered: false});
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const registerStartup = async (req, res) => {
    try {
        let status=false  
        const { userId,title, teamMembers, idea, stage, phase, requirements, consent } = req.body;
        const newStartup = new Startup({
            title: title,
            teamMembers: teamMembers,
            idea: idea,
            stage: stage,
            phase: phase,
            requirements: requirements,
            consent: consent,
            user: userId
        });
        await newStartup.save().then(()=>{
            status = true;
            res.status(201).json({ message: "Startup registered successfully", startup: newStartup ,status});
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { checkStartupRegistration, registerStartup };

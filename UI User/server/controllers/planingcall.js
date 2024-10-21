import Planingcall from "../models/planingcall.js";

export const callrequist = async (req, res) => {
  try {
    const { name, email, date, time } = req.body;
    
    if (!name || !email || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = new Planingcall({
      name,
      email,
      date,
      time,
    });

    await newFeedback.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Error in Addmessage:", error);  
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
;

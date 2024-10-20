import GoodFeedbacks from "../models/Feedbacks.js";
import WrongFeedbacks from "../models/Wrongfeedback.js";

export const AddFeedback = async (req, res) => {
  try {
    const { improvementarea, improvementdetails, user } = req.body;
    let media = null;
    if (req.file) {
      media = req.file.filename;
    }

    const parsedUser = JSON.parse(user);

    const newFeedback = new GoodFeedbacks({
      user: parsedUser,
      improvementarea,
      improvementdetails,
      media,
    });

    await newFeedback.save();
    res.status(200).json({ message: "Feedback added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AddWrongFeedback = async (req, res) => {
  try {
    const { wrongarea, wrongdetails, user } = req.body;
    let media = null;
    if (req.file) {
      media = req.file.filename;
    }

    const parsedUser = JSON.parse(user);

    const newWrongFeedback = new WrongFeedbacks({
      wrongarea: wrongarea,
      user: parsedUser,
      wrongdetails: wrongdetails,
      media: media,
    });

    await newWrongFeedback.save();
    res.status(200).json({ message: "Wrong feedback added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

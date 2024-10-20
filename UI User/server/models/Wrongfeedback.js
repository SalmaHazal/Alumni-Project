import mongoose from "mongoose";

const wrongfeedbacksSchema = new mongoose.Schema(
  {
    user: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phonenumber: { type: String, required: true },
      picturePath: { type: String, required: true }
    },
    wrongarea: {
      type: String,
      required: true,
    },
    wrongdetails: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const WrongFeedbacks = mongoose.model("WrongFeedbacks", wrongfeedbacksSchema);
export default WrongFeedbacks;

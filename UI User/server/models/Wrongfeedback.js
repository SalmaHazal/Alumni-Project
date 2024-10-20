import mongoose from "mongoose";

const wrongfeedbacksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

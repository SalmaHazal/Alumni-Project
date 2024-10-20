import mongoose from "mongoose";

const feedbacksSchema = new mongoose.Schema(
  {
    user: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phonenumber: { type: String, required: true },
      picturePath: { type: String, required: true },
    },
    improvementarea: {
      type: String,
      required: true,
    },
    improvementdetails: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const GoodFeedbacks = mongoose.model("GoodFeedbacks", feedbacksSchema);
export default GoodFeedbacks;

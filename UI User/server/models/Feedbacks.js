import mongoose from "mongoose";

const feedbacksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
}, {
  timestamps: true,
});

const GoodFeedbacks = mongoose.model("GoodFeedbacks", feedbacksSchema);
export default GoodFeedbacks;

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  videoPath: {
    type: String,
    default: "",
  },
  views: { 
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
VideoSchema.index({ createdAt: -1 }); 

const Video = mongoose.model("Video", VideoSchema);
export default Video;
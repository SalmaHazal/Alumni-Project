import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    required: true,
  },
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;

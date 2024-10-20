import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  artistName: { type: String, required: true },
  cover: { type: String, required: true },
  songFile: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;

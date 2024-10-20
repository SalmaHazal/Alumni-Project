import Song from "../models/Song.js";

export const uploading = async (req, res) => {
  const { songName, artistName } = req.body;

  const coverFile = req.files.cover ? req.files.cover[0].filename : null;
  const songFile = req.files.songFile ? req.files.songFile[0].filename : null;

  const newSong = new Song({
    songName,
    artistName,
    cover: coverFile,
    songFile,
  });

  try {
    await newSong.save();
    res.status(200).json({ message: "Upload successful", song: newSong });
  } catch (error) {
    console.error("Error saving song:", error);
    res
      .status(500)
      .json({ message: "Error saving song", error: error.message });
  }
};

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res
      .status(500)
      .json({ message: "Error fetching songs", error: error.message });
  }
};

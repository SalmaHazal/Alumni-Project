import Album from "../models/Album.js";
import fs from "fs";

// POST route to create an album
export const createAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = req.files.map((file) => file.filename);

    const newAlbum = new Album({
      title,
      description,
      images,
    });

    const savedAlbum = await newAlbum.save();
    console.log("New album created:", savedAlbum); // Check if _id exists here
    res.status(201).json(savedAlbum);
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ error: "Failed to create album" });
  }
};

// GET route to fetch all albums
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find(); // Fetch all albums from MongoDB
    res.status(200).json(albums); // Send albums as JSON response
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
};
// GET route to fetch album by ID
export const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params; // Get albumId from the request parameters
    const album = await Album.findById(albumId); // Find album by its ID in the database

    if (!album) {
      return res.status(404).json({ error: "Album not found" }); // If album doesn't exist, return 404
    }

    res.status(200).json(album); // Return album data as JSON
  } catch (error) {
    console.error("Error fetching album by ID:", error);
    res.status(500).json({ error: "Failed to fetch album" });
  }
};


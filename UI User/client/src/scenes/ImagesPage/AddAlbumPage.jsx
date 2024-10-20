import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const AddAlbum = ({ handleClose }) => {
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription);

    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/albums",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Album created:", response.data);
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error("Error creating album", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Add New Album</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Album Title"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Album Description"
          value={albumDescription}
          onChange={(e) => setAlbumDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "16px" }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: 2 }}
          >
            {" "}
            {/* Cancel button */}
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddAlbum;

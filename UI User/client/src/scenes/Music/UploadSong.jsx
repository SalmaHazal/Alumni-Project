import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material";

const UploadSong = ({ uploadStatus, setUploadStatus, setSongs }) => {
  const [cover, setCover] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const { palette } = useTheme();

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("artistName", artistName);
    formData.append("cover", cover);
    formData.append("songFile", songFile);

    try {
      // Send the form data to the server
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Song Uploaded successfully!");

      setCover(null);
      setSongFile(null);
      setSongName("");
      setArtistName("");
      setUploadStatus(false);
    } catch (error) {
      console.error("Error uploading song:", error);
      toast.error("An error occurred during uploading. Please try again.");
    }
  };

  return (
    <Dialog open={uploadStatus} onClose={() => setUploadStatus(false)}>
      <DialogTitle>
        Upload New Song
        <IconButton
          aria-label="close"
          onClick={() => setUploadStatus(false)}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            margin="dense"
            label="Song Name"
            variant="outlined"
            required
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Artist Name"
            variant="outlined"
            required
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="cover-upload">
              Cover Image
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="audio-upload">
              Audio File
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={(e) => setSongFile(e.target.files[0])}
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: palette.mode === "dark" ? "white" : "black" }}
          onClick={() => setUploadStatus(false)}
          color="secondary"
        >
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSong;

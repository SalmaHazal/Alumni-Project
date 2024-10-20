import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  useTheme,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoPath: "",
    picturePath: "",
    picture: null,
    video: null,
  });
  const [message, setMessage] = useState("");

  // Handle file input for the picture
  const handlePictureChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, picture: file }));
    }
  };

  // Handle file input for the video
  const handleVideoChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith("video/")) {
      setFormData((prev) => ({ ...prev, video: file }));
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("provider", userId);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    // Add file paths (just the filenames, not actual paths)
    if (formData.video) {
      formDataToSend.append("videoPath", formData.video.name);
      formDataToSend.append("video", formData.video); // Append video file
    }

    if (formData.picture) {
      formDataToSend.append("picturePath", formData.picture.name);
      formDataToSend.append("picture", formData.picture); // Append picture file
    }

    try {
      await axios.post("http://localhost:3001/videos", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Video posted successfully!");
      toast.success("Video posted successfully!");

      // Clear form data after submission
      setFormData({ title: "", description: "", picture: null, video: null });

      navigate("/Revu/VideoHome");
    } catch (error) {
      setMessage("Failed to post the video");
      toast.error("Failed to post the video");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
      width="100%"
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "800px" }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Post a New Video
        </Typography>
        {message && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {message}
          </Typography>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="Video Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            label="Video Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
          />

          {/* Picture Upload Section */}
          <Box
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={handlePictureChange}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!formData.picture ? (
                    <Typography>Add Picture Here</Typography>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={URL.createObjectURL(formData.picture)}
                        alt="Selected"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "5px",
                          marginBottom: "1rem",
                        }}
                      />
                      <Box sx={{ marginLeft: "1rem" }}>
                        <Typography>{formData.picture.name}</Typography>
                        <IconButton
                          component="span"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, picture: null }))
                          }
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>

          {/* Video Upload Section */}
          <Box
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".mp4,.mov"
              multiple={false}
              onDrop={handleVideoChange}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!formData.video ? (
                    <Typography>Add Video Here</Typography>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <video
                        src={URL.createObjectURL(formData.video)}
                        controls
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "5px",
                          marginBottom: "1rem",
                        }}
                      />
                      <Box sx={{ marginLeft: "1rem" }}>
                        <Typography>{formData.video.name}</Typography>
                        <IconButton
                          component="span"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, video: null }))
                          }
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Upload Video
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UploadVideo;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  Dialog,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar"; // Adjust path if necessary
import WidgetWrapper from "../../components/WidgetWrapper"; // Adjust path if necessary
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useTheme } from "@mui/system";
import Divider from "../widgets/Divider";


const AlbumDetails = () => {
  const { albumId } = useParams(); // Get album ID from URL
  const [album, setAlbum] = useState(null);
  const [open, setOpen] = useState(false); // State for modal open/close
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image
  const theme = useTheme();
  const { palette } = theme;

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/albums/${albumId}`
        ); // Fetch album by ID
        setAlbum(response.data);
      } catch (error) {
        console.error("Error fetching album details", error);
      }
    };
    fetchAlbumDetails();
  }, [albumId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!album) {
    return <Typography>Loading...</Typography>; // Display loading text while fetching
  }

  return (
    <>
    <WidgetWrapper width="90%" marginTop="3px" marginLeft="5%" height="99.5%">
  {/* Main Content */}
  
    <Typography variant="h4" mb={3}>
      {album.title}
    </Typography>
    <Typography variant="body1" mb={2}>
      {album.description}
    </Typography>
    <Grid container spacing={2}>
      {album.images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardMedia
            component="img"
            image={`http://localhost:3001/assets/${image}`}
            alt={`Image ${index + 1}`}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(image)}
          />
        </Grid>
      ))}
    </Grid>

    {/* Modal for displaying the clicked image */}
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <img
          src={`http://localhost:3001/assets/${selectedImage}`} // Display selected image
          alt="Selected"
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain", // Keep aspect ratio
          }}
        />
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
 
</WidgetWrapper>

    </>
  );
};

export default AlbumDetails;

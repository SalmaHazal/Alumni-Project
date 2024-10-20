import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,  // Correct Divider import from @mui/material
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/system";
import AddAlbum from "./AddAlbumPage";
import WidgetWrapper from "../../components/WidgetWrapper";  // Corrected the typo in WidgetWrapper

const ImagePage = () => {
  const [albums, setAlbums] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:3001/albums");
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums", error);
      }
    };
    fetchAlbums();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/revu/albums/${albumId}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <WidgetWrapper width="90%" marginTop="3px" marginLeft="5%" height="99.5%">
        {/* Main Content */}
        <Box p={3}>
          {/* Title and Button in parallel */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography fontWeight="semibold" variant="h4">
              Gallery
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Add New Album
            </Button>
          </Box>

          <Divider sx={{ marginBottom: theme.spacing(3) }} />

          {/* Albums Grid */}
          <Grid container spacing={2}>
            {albums.map((album, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                onClick={() => handleAlbumClick(album._id)}
              >
                <Card sx={{ maxWidth: 250 }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:3001/assets/${album.images[0]}`}
                    alt={album.title}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {album.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      {album.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Add Album Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Album</DialogTitle>
          <DialogContent>
            <AddAlbum handleClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </WidgetWrapper>
    </>
  );
};

export default ImagePage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const Problem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/wrongfeedbacks");
        console.log("Fetched Feedbacks:", response.data);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const categorizeFeedbacks = (area) => {
    return feedbacks.filter((feedback) => feedback.wrongarea === area);
  };

  const wrongareas = [
    { name: "ui", color: "#D1E9F6" },
    { name: "performance", color: "#F6EACB" },
    { name: "features", color: "#F1D3CE" },
    { name: "other", color: "#EECAD5" },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Section Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        User Issues
      </Typography>

      {/* Show loading indicator while feedbacks are being fetched */}
      {loading ? (
        <Typography variant="h6">Loading feedbacks...</Typography>
      ) : (
        wrongareas.map((area) => (
          <Card
            key={area.name}
            sx={{
              marginBottom: 5,
              backgroundColor: area.color,
              padding: 3,
              boxShadow: 3,
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 3,
                color: "#333",
              }}
            >
              {area.name.toUpperCase()}
            </Typography>

            <Grid container spacing={3}>
              {/* Display feedbacks for each improvement area */}
              {categorizeFeedbacks(area.name.toLowerCase()).map((feedback) => (
                <Grid item xs={12} sm={6} md={4} key={feedback._id}>
                  <Card
                    sx={{
                      minHeight: "200px",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 2,
                        }}
                      >
                        {/* User Picture */}
                        {feedback.user.picturePath && (
                          <CardMedia
                            component="img"
                            image={`http://localhost:3001/assets/${feedback.user.picturePath}`}
                            alt={`${feedback.user.firstName} ${feedback.user.lastName}`}
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              marginRight: 2,
                            }}
                          />
                        )}

                        {/* User Name */}
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {feedback.user.firstName} {feedback.user.lastName}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {feedback.wrongdetails}
                      </Typography>

                      {/* Media display (image or video) */}
                      {feedback.media && (
                        <Box sx={{ marginTop: 2 }}>
                          <CardMedia
                            component="img"
                            height="120"
                            image={`http://localhost:3001/assets/${feedback.media}`}
                            alt="Feedback media"
                          />
                        </Box>
                      )}
                    </CardContent>

                    <Box
                      sx={{
                        marginTop: "auto",
                        padding: 2,
                        textAlign: "right",
                      }}
                    >
                      <Button
                        onClick={handleClickOpen}
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          textTransform: "none",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                          "&:hover": {
                            backgroundColor: "#555",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                        variant="contained"
                        size="small"
                      >
                        User Infos
                      </Button>
                    </Box>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      BackdropProps={{
                        style: {
                          opacity: 0.3,
                        },
                      }}
                      sx={{
                        "& .MuiDialog-paper": {
                          borderRadius: "12px",
                          padding: "16px",
                        },
                      }}
                    >
                      <DialogTitle sx={{ fontWeight: "bold", color: "#333" }}>
                        User Information
                      </DialogTitle>
                      <DialogContent>
                        <Typography variant="body1">
                          <strong>First Name:</strong> {feedback.user.firstName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Last Name:</strong> {feedback.user.lastName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Email:</strong> {feedback.user.email}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Phone Number:</strong>{" "}
                          {feedback.user.phonenumber}
                        </Typography>
                        <img
                          src={`http://localhost:3001/assets/${feedback.user.picturePath}`}
                          alt="User"
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          fontWeight="bold"
                          onClick={handleClose}
                          color="gray"
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
              ))}

              {/* Message if no feedback for a specific area */}
              {categorizeFeedbacks(area.name.toLowerCase()).length === 0 && (
                <Typography
                  marginTop="20px"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                  width="100%"
                >
                  No feedback for {area.name.toLowerCase()} at the moment.
                </Typography>
              )}
            </Grid>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Problem;

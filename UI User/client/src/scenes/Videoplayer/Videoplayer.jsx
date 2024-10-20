import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import WidgetWrappe from "../../components/WidgetWrapper";

const Videoplayer = () => {
  const location = useLocation();
  const video = location.state?.video;

  if (!video) {
    return <Typography variant="h6">No video selected</Typography>;
  }

  return (
    <>
      <WidgetWrappe width="90%" marginTop="3px" marginLeft="60px">
        <Box sx={{ marginTop: "-40px" }}>
          <Box p={3}>
            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              fontWeight="bold"
              fontSize="28px"
            >
              {video.title}
            </Typography>

            {/* Video player */}
            <video
              controls
              width="100%"
              height="560px"
              src={`http://localhost:3001/assets/${video.videoPath}`}
              style={{ borderRadius: "10px", marginBottom: "20px" }}
            />
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              <Box
                component="img"
                sx={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#999",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={`http://localhost:3001/assets/${video.provider.picturePath}`}
                alt="user"
              />

              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {video.provider.firstName} {video.provider.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.views} views •
                  {new Date(video.createdAt).toLocaleDateString()}
                  {", "}
                  {new Date(video.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </WidgetWrappe>
    </>
  );
};

export default Videoplayer;

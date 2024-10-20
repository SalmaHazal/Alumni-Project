import React, { useState } from "react";
import UploadVideo from "../scenes/widgets/UploadVideo";
import Allvideo from "../scenes/widgets/Allvideo";
import { Button, Box } from "@mui/material";

const VideoForm = () => {
  const [view, setView] = useState("request");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <div className="services-container p-4">
        <Box display="flex" justifyContent="center" mb={3}>
          <Button
            variant={view === "request" ? "contained" : "outlined"}
            color={view === "request" ? "primary" : "inherit"}
            sx={{ marginRight: 2, px: 5, height: "40px" }}
            onClick={() => handleViewChange("request")}
          >
            Show All
          </Button>
          <Button
            variant={view === "post" ? "contained" : "outlined"}
            color={view === "post" ? "primary" : "inherit"}
            sx={{ px: 5, height: "40px" }}
            onClick={() => handleViewChange("post")}
          >
            Upload Video
          </Button>
        </Box>

        {view === "request" && <Allvideo />}
        {view === "post" && <UploadVideo />}
      </div>
    </div>
  );
};

export default VideoForm;

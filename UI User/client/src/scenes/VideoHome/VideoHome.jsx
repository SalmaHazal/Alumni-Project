import React from "react";
import WidgetWrappe from "../../components/WidgetWrapper";
import { Box, useTheme } from "@mui/system";
import VideoForm from "../../components/VideoForm";

const Home = () => {

  return (
    <>
      <WidgetWrappe width="93%" marginTop="3px" marginLeft="3.5%"  >
        <Box sx={{ marginTop: "10px" }} >
          <Box>
            <VideoForm />
          </Box>
        </Box>
      </WidgetWrappe>
    </>
  );
};

export default Home;

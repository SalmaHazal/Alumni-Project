import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import RadioIcon from "@mui/icons-material/PhotoLibrary";
import LamaTube from "../../../public/assets/logo.png";
import Navbar from "../navbar/Navbar";
import WidgetWrapper from "../../components/WidgetWrapper";
import Divider from "../widgets/Divider";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Revu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0); // State for tracking selected index

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index); // Update selected index
    navigate(path); // Navigate to the selected path
  };

  const { palette } = useTheme();

  return (
    <>
      <Box className="fixed-navbar">
        <Navbar />
      </Box>

      <div className="grid lg:grid-cols-[250px,1fr] max-h-[90vh] h-[90vh] mt-[10vh]">
        <WidgetWrapper className="h-full">
          <Box
            mb={3}
            display="flex"
            alignItems="center"
            gap={1}
            fontWeight="bold"
          >
            <img src={LamaTube} alt="LamaTube" style={{ height: 25 }} />
            <Typography variant="h6">AlumniTube</Typography>
          </Box>
          <Divider />
          <List>
            {[
              { icon: <HomeIcon />, text: "Home", path: "/Revu/VideoHome" },
              { icon: <MusicNoteIcon />, text: "Music", path: "/Revu/Music" },
              {
                icon: <PhotoLibraryIcon />,
                text: "Gallery",
                path: "/Revu/gallery",
              },
              {
                icon: <RadioIcon />,
                text: "Radio",
                path: "/Revu/Radio",
              },
            ].map((item, index) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleListItemClick(index, item.path)}
                sx={{
                  backgroundColor:
                    selectedIndex === index
                      ? theme.palette.action.selected
                      : "transparent", // Change background color if selected
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover, // Hover effect
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: palette.mode === "dark" ? "white" : "black" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </WidgetWrapper>

        {/* Content section (Outlet) */}
        <section className="h-full">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Revu;

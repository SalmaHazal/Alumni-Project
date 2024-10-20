import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <Box
      position="absolute"
      right="0"
      display="flex"
      width="10%"
      justifyContent="end"
      p={2}
      flexDirection="column"
    >
      {/* LOGOUT BUTTON */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ marginBottom: "10px", fontWeight: "bold" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Topbar;

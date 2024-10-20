import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Logoalumni from "/public/assets/logoalumni.png";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box backgroundColor="#f5f5f5" height="100vh">
      <Box
        width="100%"
        backgroundColor="white"
        p="1rem 6%"
        textAlign="center"
        className="flex justify-center"
      >
        <Typography>
          <img
            src={Logoalumni}
            style={{ borderRadius: "7px", height: "70px", marginLeft: "-32px" }}
            alt="Alumni Logo"
          />
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="white"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <Typography
          fontSize="25px"
          fontWeight="700"
          variant="h5"
          sx={{ mb: "1.5rem", color: "black" }}
        >
          Welcome to the Admin Dashboard of {" "}
          <Typography
            fontSize="25px"
            fontWeight="700"
            component="span"
            sx={{ color: "#00d4fa", mb: "1.5rem" }}
          >
            Alumni SUD
          </Typography>

        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

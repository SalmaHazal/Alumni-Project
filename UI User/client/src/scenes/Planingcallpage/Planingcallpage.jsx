import React, { useState } from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios"; // Ensure axios is correctly set up
import Settings from "../../scenes/settings/Settings";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useTranslation } from 'react-i18next';


const Planingcallpage = () => {
  const { t ,  i18n} = useTranslation();
  const language = i18n.language;
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [tempLink, setTempLink] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date:"",
    time:"",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
        await makeRequest.post("/planingcall", formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        toast.success("Message sent successfully!");
        navigate("/Helppage");
    } catch (error) {
        toast.error("Error sending message");
    }
};
 


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Right",
          marginTop: "20px", // Contrôle de l'espace en haut
        }}
      >
        <Settings />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginTop: "-600px",
          marginRight: "600px", // Contrôle de l'espace en haut
        }}
      >
        <WidgetWrapper
          width="800px"
          sx={{
            marginTop: "-40px", // Contrôle de l'espace entre le texte et le widget
            marginLeft: language === "ar" ? "-10%" : "60%", // Adjust positioning based on language
          }}
        >
        

        <>
      <Typography variant="h4" align="center" gutterBottom color="#37B7C3">
        Planing Call
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name ? errors.name : ""}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email ? errors.email : ""}
        />
        <TextField
         name="date"
         type="date" // Change the input type to date
         value={formData.date} // Ensure you're referencing the correct value in formData
         onChange={handleChange}
         onBlur={handleBlur}
         fullWidth
         required
         error={Boolean(touched.date && errors.date)} // Adjust error handling for date
         helperText={touched.date && errors.date ? errors.date : ""}
        />
       <TextField
         label="Hour"
         name="time"
         type="time" // Input type for time
         value={formData.time} // Ensure you're referencing the correct value in formData
         onChange={handleChange}
         onBlur={handleBlur}
         fullWidth
         required
         error={Boolean(touched.time && errors.time)} // Adjust error handling for time
         helperText={touched.time && errors.time ? errors.time : ""}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="text"
            sx={{ color: "#b0b3b8", width: "150px", marginTop: "20px" }}
            onClick={() => navigate("/Helppage")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "150px", marginTop: "20px" }}
          >
            Send
          </Button>
        </Box>
      </form>
    </>
    </WidgetWrapper>
    </Box>
    

    </>
  );
};

export default Planingcallpage;

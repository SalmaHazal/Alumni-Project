import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";  // For making API calls

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  // Fetch users from MongoDB on component mount
  useEffect(() => {
    axios.get("http://localhost:3002/users")
      .then((response) => {
        setUsers(response.data); // Assuming response contains the users array
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "linkedinLink",
      headerName: "LinkedIn",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[500] }}>
          LinkedIn Profile
        </a>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "promotion",
      headerName: "Promotion",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Contacts" subtitle="Getting the Members contats" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={users.map((user, index) => ({ 
            ...user, 
            id: index + 1, 
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            linkedinLink: user.linkedInLink,
            phoneNumber: user.phonenumber,
            occupation: user.occupation,
            promotion: user.promotion
          }))} 
          columns={columns} 
        />
      </Box>
    </Box>
  );
};

export default Contacts;

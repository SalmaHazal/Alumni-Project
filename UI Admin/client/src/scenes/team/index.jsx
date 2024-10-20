import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import axios from "axios";  // For making API calls

const Team = () => {
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

  // Function to delete a user
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:3002/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

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
      field: "promotion",
      headerName: "Promotion ",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography color={colors.grey[100]}>
          {value} {/* Displaying the numeric promotion value directly */}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteUser(params.row._id)}>
          <DeleteIcon sx={{ color: colors.redAccent[600] }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          rows={users.map((user) => ({ 
            ...user, 
            id: user._id, // Ensure unique ID is used
            name: `${user.firstName} ${user.lastName}`,
          }))} 
          columns={columns} 
        />
      </Box>
    </Box>
  );
};

export default Team;

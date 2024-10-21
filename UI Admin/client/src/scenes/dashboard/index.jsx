import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userCount, setUserCount] = useState(0);
  const totalGoal = 1000;

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:3002/locations");
        setUserCount(response.data.length);
      } catch (error) {
        console.error("Error fetching user count", error);
      }
    };

    fetchUserCount();
  }, []);

  const progress = Math.min(userCount / totalGoal, 1);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alumni Distribution by City
              </Typography>
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={false} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Alumni Members
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={progress} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {userCount} total alumni members
            </Typography>
            <Typography>
              Growing alumni network towards {totalGoal} goal
            </Typography>
          </Box>
        </Box>


        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          height="410px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Alumni Distribution by City
          </Typography>
          <Box height="350px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>


        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="20px"
          height="410px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="250px" mt="20px">
            {/* GeographyChart component adjusted for full height */}
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

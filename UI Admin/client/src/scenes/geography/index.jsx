import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* Page Header */}
      <Header title="Geography" subtitle="Interactive Geography Chart" />

      {/* Chart Container */}
      <Box
        height="50vh"
        width="100%"
        maxWidth="1000px"
        mx="auto"
        p="10px"
        borderRadius="12px"
        boxShadow={`0 4px 19px rgba(0, 0, 0, 0.1)`}
        bgcolor={colors.primary[400]}
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;

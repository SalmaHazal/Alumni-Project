import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartlineData, setChartlineData] = useState([]);
  const fullYearRange = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/users/promotion");
        const userData = response.data;

        const chartData = userData.map((item) => ({
          id: item.city, 
          data: item.promotions.map((promo) => ({
            x: promo.promotion,
            y: promo.count,    
          })),
        }));

        setChartlineData(chartData);
        console.log(chartData)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <ResponsiveLine
      data={chartlineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      keys={["count"]}
      indexBy="promotion" 
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "linear", min: 2016, max: 2025 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: chartlineData.forEach(city => {
          const yearMap = city.data.reduce((map, point) => {
               map[point.x] = point.y;
               return map;
          }, {});
          city.data = fullYearRange.map(year => ({
            x: year,
            y: yearMap[year] || 0  
          }));
            city.data.sort((a, b) => parseInt(a.x) - parseInt(b.x));
          }), 
        legend: isDashboard ? undefined : "Promotion", 
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Users", 
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

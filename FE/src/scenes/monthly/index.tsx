import { useMemo } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useAppTheme } from "../../helpers/useAppTheme";
import { useGetSalesQuery } from "../../store/api";
import { useAppSelector } from "../../helpers/useAppSelector";
import { OverviewInterface } from "../../interfaces/OverviewChart/OverviewInterface";
import { ResponsiveLine } from "@nivo/line";
import { MonthlyFormattedDateInterface } from "../../interfaces/Monthly/MonthlyFormattedDate";

export const Monthly = () => {
  const theme = useAppTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data } = useGetSalesQuery(userId);

  const [formattedData] = useMemo<Array<OverviewInterface[]>>(() => {
    if (!data) return [];

    const { monthlyData } = data;

    const totalSalesLine: OverviewInterface = {
      id: "totalSales",
      color: theme.palette.secondary.main as string,
      data: [],
    };
    const totalUnitsLine: OverviewInterface = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach((value) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        {
          x: (value as MonthlyFormattedDateInterface).month,
          y: (value as MonthlyFormattedDateInterface).totalSales,
        },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {
          x: (value as MonthlyFormattedDateInterface).month,
          y: (value as MonthlyFormattedDateInterface).totalUnits,
        },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data]);

  return (
    <Box m="15px 25px">
      <Header title="Monthly sales" subtitle="Chart of monthly sales" />
      <Box mt="40px" height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
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
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;

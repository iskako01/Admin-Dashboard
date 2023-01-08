import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useAppTheme } from "../../helpers/useAppTheme";
import { useGetSalesQuery } from "../../store/api";
import DatePicker from "react-datepicker";
import { useAppSelector } from "../../helpers/useAppSelector";
import { OverviewInterface } from "../../interfaces/OverviewChart/OverviewInterface";
import { ResponsiveLine } from "@nivo/line";
import "react-datepicker/dist/react-datepicker.css";

export interface DailyFormattedDateInterface {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export const Daily = () => {
  const theme = useAppTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data } = useGetSalesQuery(userId);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-02-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-03-01"));

  const [formattedData] = useMemo<Array<OverviewInterface[]>>(() => {
    if (!data) return [];

    const { dailyData } = data;

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

    if (startDate && endDate) {
      Object.values(dailyData).forEach((value) => {
        const dateFormatted = new Date(
          (value as DailyFormattedDateInterface).date
        );

        if (dateFormatted >= startDate && dateFormatted <= endDate) {
          const splitDate = (
            value as DailyFormattedDateInterface
          ).date.substring(
            (value as DailyFormattedDateInterface).date.indexOf("-") + 1
          );

          totalSalesLine.data = [
            ...totalSalesLine.data,
            {
              x: splitDate,
              y: (value as DailyFormattedDateInterface).totalSales,
            },
          ];
          totalUnitsLine.data = [
            ...totalUnitsLine.data,
            {
              x: splitDate,
              y: (value as DailyFormattedDateInterface).totalUnits,
            },
          ];
        }
      });
    }

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data, startDate, endDate]);

  return (
    <Box m="15px 25px">
      <Header title="Daily sales" subtitle="Chart of daily sales" />
      <Box mt="40px" height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
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
            curve="catmullRom"
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

export default Daily;

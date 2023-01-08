import { FC, useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../store/api";
import { useAppSelector } from "../helpers/useAppSelector";
import { useAppTheme } from "../helpers/useAppTheme";
import { OverviewInterface } from "../interfaces/OverviewChart/OverviewInterface";
import { AccumulatorDataInterface } from "../interfaces/OverviewChart/AccumulatorDataInterface";
import { SalesDataInterface } from "../interfaces/OverviewChart/SalesDataInterface";

interface PropsInterface {
  isDashboard: boolean;
  view: string;
}

const OverviewChart: FC<PropsInterface> = ({ isDashboard = false, view }) => {
  const theme = useAppTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useGetSalesQuery(userId);

  const [totalSalesLine, totalUnitsLine] = useMemo<
    Array<OverviewInterface[]> | []
  >(() => {
    if (!data) {
      return [];
    }

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

    Object.values(monthlyData).reduce(
      (acc: AccumulatorDataInterface, currentValue) => {
        const curSales =
          acc.sales + (currentValue as SalesDataInterface).totalSales;
        const curUnits =
          acc.units + (currentValue as SalesDataInterface).totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: (currentValue as SalesDataInterface).month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: (currentValue as SalesDataInterface).month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);

  return (
    <>
      {!data || isLoading} ?{" "}
      <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            if (isDashboard) return v.slice(0, 3);
            return v;
          },

          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard
            ? ""
            : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
          legendOffset: -60,
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
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 30,
                  translateY: -40,
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
              ]
            : undefined
        }
      />{" "}
      : <>"Loading..."</>
    </>
  );
};

export default OverviewChart;

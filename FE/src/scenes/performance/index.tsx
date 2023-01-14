import { useAppSelector } from "../../helpers/useAppSelector";
import { useGetUserPerformanceQuery } from "../../store/api";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppTheme } from "../../helpers/useAppTheme";
import Header from "../../components/Header";
import DataGridCustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import { ProductInterface } from "../../interfaces/Product/ProductInterface";

const Performance = () => {
  const theme = useAppTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params: any) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: any) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="15px 25px">
      <Header
        title="Performance"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      {data || !isLoading ? (
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.sales) || []}
            columns={columns}
            components={{ ColumnMenu: DataGridCustomColumnMenu }}
          />
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Performance;

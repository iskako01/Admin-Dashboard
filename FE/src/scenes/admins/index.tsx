import { useAppSelector } from "../../helpers/useAppSelector";
import { useGetAdminsQuery } from "../../store/api";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppTheme } from "../../helpers/useAppTheme";
import Header from "../../components/Header";
import DataGridCustomColumnMenu from "../../components/DataGridCustomColumnMenu";

const Admins = () => {
  const theme = useAppTheme();
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useGetAdminsQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params: any) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="15px 25px">
      <Header title="Admins" subtitle="List of Admins" />
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
            rows={data || []}
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

export default Admins;

import { useState } from "react";
import { useAppSelector } from "../../helpers/useAppSelector";
import { useGetTransactionsQuery } from "../../store/api";
import { DataGrid } from "@mui/x-data-grid";
import { useAppTheme } from "../../helpers/useAppTheme";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useGetTransactionsQuery(userId);
  const theme = useAppTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  console.log(data);

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
      flex: 0.4,
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
      <Header title="Transactions" subtitle="Entire list of transactions" />
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
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort([...newSortModel])}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Transactions;

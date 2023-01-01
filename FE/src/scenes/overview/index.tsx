import { useState } from "react";
import { Box, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m="15px 25px">
      <Header
        title="Overview"
        subtitle="Overview of general revenue and profit"
      />

      <Box mt="10px" height="75vh">
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="view"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} isDashboard={false} />
      </Box>
    </Box>
  );
};

export default Overview;

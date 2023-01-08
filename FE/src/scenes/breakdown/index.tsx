import { Box } from "@mui/material";
import Header from "../../components/Header";
import BreakDownChart from "../../components/BreakDownChart";

const Breakdown = () => {
  return (
    <Box m="15px 25px">
      <Header title="Breakdown" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakDownChart isDashboard={false} />
      </Box>
    </Box>
  );
};

export default Breakdown;

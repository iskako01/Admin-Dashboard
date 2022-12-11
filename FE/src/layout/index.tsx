import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DefaultLayout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;

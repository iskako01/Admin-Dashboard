import { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./helpers/useAppSelector";
import Dashboard from "./scenes/dashboard";
import DefaultLayout from "./layout";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admins from "./scenes/admins";
import Performance from "./scenes/performance";

function App() {
  const mode = useAppSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

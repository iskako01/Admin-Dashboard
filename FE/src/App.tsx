import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { RootState } from "./store";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import DefaultLayout from "./layout";

function App() {
  const mode: string = useSelector((state: RootState) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

import { ThemeSettingsInterface } from "../interfaces/ThemeSettingsInterface";
import { useTheme } from "@mui/material";

export const useAppTheme = () => useTheme<ThemeSettingsInterface>();

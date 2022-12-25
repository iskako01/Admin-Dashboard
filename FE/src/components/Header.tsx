import { Typography, Box } from "@mui/material";
import { useAppTheme } from "../helpers/useAppTheme";
interface PropsInterface {
  title: string;
  subtitle: string;
}

const Header: React.FC<PropsInterface> = ({ title, subtitle }) => {
  const theme = useAppTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

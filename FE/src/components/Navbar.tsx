import { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { setMode } from "../store/global.slice";
import { UserInterface } from "../interfaces/User/UserInterface";
import profileImage from "../assets/profile.png";
import { ThemeSettingsInterface } from "../interfaces/ThemeSettingsInterface";

interface PropsInterface {
  user: UserInterface;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Navbar: React.FC<PropsInterface> = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme<ThemeSettingsInterface>();
  const [anchorElement, setAnchorElement] = useState(null);
  const isOpen = Boolean(anchorElement);

  const onChangeMode = () => {
    dispatch(setMode());
  };

  const handleClick = (event: any) => setAnchorElement(event.currentTarget);
  const handleClose = (event: any) => setAnchorElement(null);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.default}
            borderRadius="10px"
            gap="5px"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween>
          <IconButton onClick={onChangeMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alighItems: "center",
                textTransform: "none",
                gap: "10px",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="30px"
                width="30px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="8px"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="7px"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorElement}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClick}>Log out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

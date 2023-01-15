import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useAppTheme } from "../helpers/useAppTheme";

interface PropsInterface {
  title: string;
  value: string;
  increase: string;
  icon: ReactElement<any, any>;
  description: string;
}

const StatBox: FC<PropsInterface> = ({
  title,
  value,
  increase,
  icon,
  description,
}) => {
  const theme = useAppTheme();
  //   backgroundColor={theme.palette.background.alt}
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.main }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;

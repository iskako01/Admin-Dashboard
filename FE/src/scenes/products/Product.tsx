import { FC, useState } from "react";
import { ProductInterface } from "../../interfaces/Product/ProductInterface";
import { useAppTheme } from "../../helpers/useAppTheme";
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Rating,
} from "@mui/material";

interface PropsInterface {
  product: ProductInterface;
}

export const Product: FC<PropsInterface> = ({ product }) => {
  const theme = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        border: "1px",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[200]}
          textTransform="uppercase"
          gutterBottom
        >
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: "15px" }} color={theme.palette.secondary[400]}>
          ${Number(product.price).toFixed(2)}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant="body2">{product.description}</Typography>

        <CardActions>
          <Button
            variant="outlined"
            sx={{ color: theme.palette.grey[500] }}
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>

        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.grey[500],
          }}
        >
          <CardContent>
            <Typography>id: {product._id}</Typography>
            <Typography>Supply Left: {product.supply}</Typography>
            <Typography>
              Yearly Sales This Year: {product.stat.yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold This Year: {product.stat.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

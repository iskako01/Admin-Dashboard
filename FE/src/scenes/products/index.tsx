import { Box, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../helpers/useAppSelector";
import { useGetProductsQuery } from "../../store/api";
import Header from "../../components/Header";
import { Product } from "./Product";
import { ProductInterface } from "../../interfaces/Product/ProductInterface";

const Products = () => {
  const userId: string = useAppSelector((state) => state.global.userId);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = useGetProductsQuery(userId);

  return (
    <Box m="15px 25px">
      <Header title="Products" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((product: ProductInterface) => (
            <Product key={product._id} product={product} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;

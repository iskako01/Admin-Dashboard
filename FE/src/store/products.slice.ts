import { ProductInterface } from "./../interfaces/Product/ProductInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateInterface {
  products: ProductInterface[];
  userId: string;
}

const initialState = {
  products: [],
  userId: "63701cc1f03239c72c00017f", //mock data
} as InitialStateInterface;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductInterface[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

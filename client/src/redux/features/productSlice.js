import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getProductList = createAsyncThunk("getProductList", async () => {
  try {
    const response = await axios.get("/api/product");
    // console.log(response.data);
    return response.data; // Return the entire response
  } catch (error) {
    throw new Error(`Error in getProductList: ${error.message}`);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    product: null,
    isError: false,
    Message:null
  },
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product; 
    });
    builder.addCase(getProductList.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.Message = action.payload; // Set the error message
      });
  },
});

// selector 
export const selectproduct = (state) => state.product.product;
export default productSlice.reducer;

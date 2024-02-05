import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Action
export const getUserCart = createAsyncThunk("getUserCart", async () => {
  try {
    const response = await axios.get("/api/cart");
    return response.data; // Return the entire response
  } catch (error) {
    throw new Error(`Error in getUserCart: ${error.message}`);
  }
});


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cart: null,
    isError: false,
    Message:null
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload.cart; 
    });
    builder.addCase(getUserCart.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// selector 
export const selectCart = (state) => state.cart.cart;
export default cartSlice.reducer;

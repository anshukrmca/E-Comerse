import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getAdminOrder = createAsyncThunk("getAdminOrder", async () => {
  try {
    const response = await axios.get("/api/admin/orders");
   //console.log(response.data.orders);
    return response.data.orders; // Return the entire response
  } catch (error) {
    throw new Error(`Error in getAdminOrder: ${error.message}`);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    isLoading: false,
    orders: null,
    isError: false,
    Message:null
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(getAdminOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload; 
    });
    builder.addCase(getAdminOrder.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.Message = action.payload; // Set the error message
      });
  },
});

// selector 
export const selectorders = (state) => state.orders.orders;
export default ordersSlice.reducer;

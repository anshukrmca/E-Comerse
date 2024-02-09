import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const getUserOrder = createAsyncThunk("getUserOrder", async () => {
  try {
    const response = await axios.get("/api/orders/user");
   // console.log(response.data);
    return response.data; // Return the entire response
  } catch (error) {
    throw new Error(`Error in getUserOrder: ${error.message}`);
  }
});


const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    order: null,
    isError: false,
    Message:null
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.order; 
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.Message = action.payload; // Set the error message
      });
  },
});

// selector 
export const selectorder = (state) => state.order.order;
export default orderSlice.reducer;

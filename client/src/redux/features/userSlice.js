import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Action
export const getUserCurrentData = createAsyncThunk("getUserCurrentData", async () => {
  try {
    const response = await axios.get("/api/auth/profile");
    // console.log(response.data)
    return response.data; // Return the entire response
  } catch (error) {
    throw new Error(`Error in getUserCurrentData: ${error.message}`);
  }
});

// Action to logout
export const logout = createAsyncThunk("logout", async () => {
  try {
    const response = await axios.get("/api/auth/signout");
    return response.data;
  } catch (error) {
    throw new Error(`Error in logout: ${error.message}`);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    isError: false,
    Message:null
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCurrentData.pending, (state) => {
      state.isLoading = true;
      state.isError = false; // Reset isError when starting a new request
    });
    builder.addCase(getUserCurrentData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user; // Access the 'user' property in the payload
    });
    builder.addCase(getUserCurrentData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.Message= action.payload;
    //  alert("Session Expired !")
      //localStorage.removeItem('token');
      state.isLoading = false;
      state.isError = true;
    });


     // Add the logout cases
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(logout.fulfilled, (state,action) => {
      state.isLoading = false;
      state.user = null; // Clear user data on logout
      state.Message= action.payload
      localStorage.removeItem("token");
      toast.success("Logout successful!");
      window.location.reload();
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// selector 
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;

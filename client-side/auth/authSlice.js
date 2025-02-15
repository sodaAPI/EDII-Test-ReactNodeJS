import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "/login/user",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: user.email, password: user.password },
        { withCredentials: true }
      );
      toast.success("Login Successful");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        toast.error(`Login Failed: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("/me", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const personalData = createAsyncThunk("/me", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      toast.error(`Failed to get user data: ${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    await axios.delete("http://localhost:5000/api/auth/logout", {
      withCredentials: true,
    });
    toast.success("Logout Successful");
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      toast.error(`Logout Failed: ${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

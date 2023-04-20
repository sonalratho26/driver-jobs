import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import axios from "axios";


const initialState = {
  isLoading: false,
  createDriver:{},
  toggle: false,
  error: false,
 
};



export const createDriverActions = createAsyncThunk(
  "driverJob/createDriverActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post("/users", details,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (err) {
      
      return err.response.data
    }
  }
);



const DriverSlice = createSlice({
  name: "Driver",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createDriverActions.pending]: (state) => {
      state.isLoading = true;
    },
    [createDriverActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
   
   
      const {
        payload: { data },
      } = payload
      state.createDriver = data;
    
    
    },
    [createDriverActions.rejected]: (state, payload) => {
      state.isLoading = false
      state.createDriver = payload;
    },
    
   
  },
});

export default DriverSlice.reducer;
export const {} = DriverSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import axios from "axios";


const initialState = {
  isLoading: false,
  loginUserReducer: {},
  signInUserReducer: {},
  fetchUserReducer: [],
  toggle: false,
  data: [],
  error: false,
  logOutUserReducer: {},
  putUserEditDataR: {},
  deleteUserById: {},
  editDataR: {},
  deleteData: {},
  forgetpassword:{},
  resetpassword:{},
  expired:{}
};

export const fetchUserActions = createAsyncThunk(
  "driverJob/getUser",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const loginUserActions = createAsyncThunk(
  "driverJob/loginUser",
  async (details, thunkAPI) => {
    try {
      const res = await customFetch.post("/login", details);
      localStorage.setItem("token", res.data.accessToken);
      return res;
    } catch (err) {
      
      return err.response.data
    }
  }
);

export const signInUserActions = createAsyncThunk(
  "allSurvey/signInUserActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post(`/register`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const getEditDataAction = createAsyncThunk(
  "allSurvey/getEditDataAction",
  async (id, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const editUserActions = createAsyncThunk(
  "driverJob/editUserAction",
  async (data, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let uuid = localStorage.getItem("driver_uuid") ?  localStorage.getItem("driver_uuid") : localStorage.getItem("uuid") 
      const res = await customFetch.put(`/edit/users/${uuid}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const getDeleteDataAction = createAsyncThunk(
  "allSurvey/getDeleteDataAction",
  async (details) => {
    return details;
  }
);

export const deleteUserActions = createAsyncThunk(
  "allSurvey/deleteUserActions",
  async (id, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.delete(`/delete/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const logOutActions = createAsyncThunk(
  "driverJob/logOutActions",
  async ( thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);


export const forgetPasswordActions = createAsyncThunk(
  "allSurvey/forgetPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post(`/forgetpassword`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);


export const resetPasswordActions = createAsyncThunk(
  "allSurvey/resetPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let resettoken = JSON.parse(localStorage.getItem("resettoken"))
      const res = await customFetch.post(`/resetpassword/${resettoken}`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);

export const expiredPasswordActions = createAsyncThunk(
  "allSurvey/expiredPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let resettoken = JSON.parse(localStorage.getItem("resettoken"))
      const res = await customFetch.get(`/checklinkexpired/${resettoken}`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return err.response.data
    }
  }
);





const UserSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
   
    const {
      payload: { status },
    } = payload
    if (status === "failed") {
      state.data = payload.payload
    }else{
      const {
        payload: { data },
      } = payload
      state.data = data;
      localStorage.setItem('loginDetails',JSON.stringify(data))
      window.sessionStorage.setItem('authenticated', 'true');
      localStorage.setItem("role_id",data?.role_id)
      localStorage.setItem("uuid",data?.uuid)

    }
    
    },
    [loginUserActions.rejected]: (state, payload) => {
      state.isLoading = false
      state.data = payload;
    },
    [fetchUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchUserReducer = data;
      state.putUserEditDataR = {}
      state.data = {}
      // return { ...state, fetchUserReducer: { ...state.fetchUserReducer, data } }
    },
    [signInUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [signInUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      
      state.signInUserReducer = data;
    },
    [signInUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      
      state.signInUserReducer = payload.payload;
    },
    [getEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.editDataR = data;
    },
    [editUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.putUserEditDataR = data;
    },
    [editUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      
      state.putUserEditDataR = payload.payload;
    },
    [getDeleteDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getDeleteDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      state.deleteData = payload.payload;
    },
    [deleteUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteUserById = data;
    },
    [deleteUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteUserById = data;
    },
    [logOutActions.fulfilled]: (state, payload) => {
      const {
        payload: { data },
      } = payload;
      state.logOutUserReducer = data;
    },
    [logOutActions.rejected]: (state, payload) => {
      const {
        payload: { data },
      } = payload;
      state.logOutUserReducer = data;
    },
    [forgetPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [forgetPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.forgetpassword = data;
    },
    [forgetPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.forgetpassword = data;
    },
    [resetPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.resetpassword = data;
    },
    [resetPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.resetpassword = data;
    },
    [expiredPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [expiredPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.expired = data;
    },
    [expiredPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.expired = data;
    },
  },
});

export default UserSlice.reducer;
export const {} = UserSlice.actions;

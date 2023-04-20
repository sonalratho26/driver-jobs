import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import axios from "axios";


const initialState = {
  isLoading: false,
  loginUserReducer: {},
  createJob: {},
  fetchJobReducer: {},
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
  expired:{},
  jobImage:{},
  reportData:{},
  imageDataById:{},
  deleteJob:{},
  jobByDriverId:{},
  reportDataDriver:{}
};

export const fetchJopActions = createAsyncThunk(
  "driverJob/fetchJopActions",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/jobs`, {
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

export const createJobActions = createAsyncThunk(
  "driverJob/createJobActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post("/jobs", details,{
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



export const getEditDataAction = createAsyncThunk(
  "driverJob/getEditDataAction",
  async (id, thunkAPI) => {
      let token = localStorage.getItem("token");
      try {
        const res = await customFetch(`/Jobsbyid/${id}`, {
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

export const editJobActions = createAsyncThunk(
  "driverJob/editJobActions",
  async (data, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let id = localStorage.getItem("editId") ? localStorage.getItem("editId") : localStorage.getItem("job_id")
      const res = await customFetch.put(`/edit/Jobs/${id}`, data, {
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


export const editDriveJobActions  =  createAsyncThunk(
  "driverJob/editDriveJobActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post(`/Job_img`, details,{
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

export const getReprtAdminActions  =  createAsyncThunk(
  "driverJob/getReprtAdminActions",
  async (details, thunkAPI) => {
    let token = localStorage.getItem("token");
    let location = details.location ? details.location : null
    let startDate =  details.startDate ? details.startDate : null
    let endDate = details.endDate ? details.endDate : null
    let driverName = details.driverName ? details.driverName : null
    try {
      const res = await customFetch(`/report/job_location/${location}&${startDate}to${endDate}&${driverName}`, {
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


export const getReprtDriverActions  =  createAsyncThunk(
  "driverJob/getReprtDriverActions",
  async (details, thunkAPI) => {
    let token = localStorage.getItem("token");
    let data = JSON.parse(localStorage.getItem("loginDetails"));
    let location = details.location ? details.location : null
    let startDate =  details.startDate ? details.startDate : null
    let endDate = details.endDate ? details.endDate : null
    let driverName = data?.id ? data?.id : null

    try {
      const res = await customFetch(`/report/job_locationId/${location}&${startDate}to${endDate}&${driverName}`, {
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

export const fetchJobImageByidActions = createAsyncThunk(
  "driverJob/fetchJobImageByidActions",
  async (id, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/Job_img/${id}`, {
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


export const fetchJobByDriverId = createAsyncThunk(
  "driverJob/fetchJobByDriverId",
  async (id, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/Jobsbydriverid/${id}`, {
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

export const deleteJobActions = createAsyncThunk(
  "allSurvey/deleteJobActions",
  async (id, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.delete(`/delete/job/${id}`, {
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

const JobSlice = createSlice({
  name: "Job",
  initialState: initialState,
  reducers: {},
  extraReducers: {
 
    [fetchJopActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchJopActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchJobReducer = data;
      state.putUserEditDataR = []
      state.createJob = {}
      state.deleteJob = {}
    },
    [createJobActions.pending]: (state) => {
      state.isLoading = true;
    },
    [createJobActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      
      state.createJob = data;
    },
    [createJobActions.rejected]: (state, payload) => {
      state.isLoading = false;
      
      state.createJob = payload.payload;
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
      localStorage.setItem('editData',JSON.stringify(data))
    },
    [editJobActions.pending]: (state) => {
      state.isLoading = true;
    },
    [editJobActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.putUserEditDataR = data;
    },
    [editJobActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.putUserEditDataR = data;
    },
    [editDriveJobActions.pending]: (state) => {
      state.isLoading = true;
    },
    [editDriveJobActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      
      state.jobImage = data;
    },
    [editDriveJobActions.rejected]: (state, payload) => {
      state.isLoading = false;
      
      state.jobImage = payload.payload;
    },
    [getReprtAdminActions.pending]: (state) => {
      state.isLoading = true;
    },
    [getReprtAdminActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.reportData = data;
    },
    [getReprtDriverActions.pending]: (state) => {
      state.isLoading = true;
    },
    [getReprtDriverActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.reportDataDriver = data;
    },
    [fetchJobImageByidActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchJobImageByidActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.imageDataById = data;
    },
    [deleteJobActions.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteJobActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteJob = data;
    },
    [deleteJobActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteJob = data;
    },
    [fetchJobByDriverId.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchJobByDriverId.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.jobByDriverId = data;
    },
  },
});

export default JobSlice.reducer;
export const {} = JobSlice.actions;

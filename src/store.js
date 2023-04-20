import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice.js/userSlice'
import driverSlice from './features/drivers/driverSlice'
import jobsSlice from './features/jobs/jobsSlice'


export const store = configureStore({
  reducer: {
   user:userSlice,
   driver:driverSlice,
   job:jobsSlice
  },
})

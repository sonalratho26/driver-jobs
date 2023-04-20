import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import validate from 'src/utils/addJobValidation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserActions } from 'src/features/userSlice.js/userSlice';
import { createJobActions } from 'src/features/jobs/jobsSlice';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { Router, useRouter } from 'next/router';

const status = [
  {
    value: 'assigned',
    label: 'Assigned'
  },
  {
    value: 'notAssigned',
    label: 'Not Assigned'
  }
];


const location = [
  {
    value: 'location_1',
    label: 'Location 1'
  },
  {
    value: 'location_2',
    label: 'Location 2'
  },
  {
    value: 'location_3',
    label: 'Location 3'
  },
  {
    value: 'location_4',
    label: 'Location 4'
  },
  {
    value: 'location_5',
    label: 'Location 5'
  }
];

export const AddJobsDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);


   const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const userData = useSelector((state) => state?.user?.fetchUserReducer) || []
  const jobData = useSelector((state) => state?.job?.createJob)


  useEffect(() => {
    if (jobData?.statusCode === "200") {
      toast.success(jobData?.message);
      setTimeout(() => {
        router.push('/jobs');
      }, 2000);
     
    } else if (jobData?.status === "failed") {
      
    }
  }, [jobData]);




  useEffect(() => {
    dispatch(fetchUserActions());
  }, [dispatch]);

  useEffect(() => {
    if (validateData) {
      setErrors(validate(values));
    }
  }, [values]);

  const formData = new FormData();
  const handleSubmit = (event) => {
   
    event.preventDefault()
    setValidatedata(true);
    setErrors(validate(values));
    formData.append("name", values.name);
    formData.append("assign_status", values.assign_status);
    formData.append("driver_id", values.driver_id);
    formData.append("description", values.description);
    formData.append("job_location", values.job_location);
    if (values.name !== undefined && values.assign_status != undefined && values.driver_id !== undefined && values.description !== undefined && values.job_location !== undefined) {
     
      dispatch(createJobActions(formData))
    }
  };
  // const handleChange = useCallback(
  //   (event) => {
  //     setValues((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value
  //     }));
  //   },
  //   []
  // );

  // const handleSubmit = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //   },
  //   []
  // );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <ToastContainer position="top-right"
        className="ToastContainer"
        autoClose={1500}/>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Add job"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField fullWidth label="Job name" name="name" type="text"   onChange={handleChange}
                value={values.name || ""} 
                error={!!(errors.name)}
                  helperText={errors.name} />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                  <TextField
                  fullWidth
                  label="Select Driver"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  name="driver_id"
                  value={values.driver_id || ""}
                  error={!!(errors.driver_id)}
                  helperText={errors.driver_id}
                >
                 <option
                    value="" disabled selected hidden>
                 
                    </option>
                  {userData.length > 0 && userData?.map((data, id) => {
                    if (data.role_id == 1) {
                      return (
                        <option
                        value={data.user_id} key={id}
                        >
                         {data.name}
                        </option>
                      );
                    }
                    
                  })}
                </TextField>
            
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select Location"
                  name="job_location"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.job_location || ""}
                  error={!!(errors.job_location)}
                  helperText={errors.job_location}
                >
                 <option
                    value="" disabled selected hidden>
                 
                    </option>
                  {location.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select Status"
                  name="assign_status"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.assign_status || ""}
                  error={!!(errors.assign_status)}
                  helperText={errors.assign_status}
                >
                 <option
                    value="" disabled selected hidden>
                 
                    </option>
                  {status.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
               <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue="Description"
                name="description"
                onChange={handleChange}
                value={values.description || ""}
                error={!!(errors.description)}
                  helperText={errors.description}
              />
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

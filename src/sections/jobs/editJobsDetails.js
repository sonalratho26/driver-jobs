import { useCallback, useEffect, useReducer, useState } from 'react';
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
import DropZone from 'src/components/DropZone';
import { editDriveJobActions } from 'src/features/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useDropzone} from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



export const EditJobsDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);


  useEffect(() => {
    if (validateData) {
      setErrors(validate(values));
    }
  }, [values]);
  const formData = new FormData();
  const userData = JSON.parse(localStorage.getItem("loginDetails"));

  const jobData = useSelector((state) => state?.job?.jobImage)


  useEffect(() => {
    if (jobData?.statusCode === "200") {
      toast.success(jobData?.message);
      setTimeout(() => {
        router.push('/jobs');
      }, 2000);
     
    } else if (jobData?.status === "failed") {
      
    }
  }, [jobData]);


  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatchData] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  
  const handleSubmit = (event) => {
    let files = data.fileList;
    setValues(data.fileList)
    // loop over files and add to formData
    files.forEach((file) => formData.append("images", file));
    formData.append("job_id",userData?.job_id)
    event.preventDefault()
    setValidatedata(true);
    setErrors(validate(values));
    if (files.length !== 0) {
    dispatch(editDriveJobActions(formData))
    }
    
  };

  return (
    <form
      autoComplete="off"
      noValidate
      enctype="multipart/form-data"
      method='post'
    >
      <ToastContainer position="top-right"
        className="ToastContainer"
        autoClose={1500}/>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Edit job"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                xs={12}
                md={6}
              >
                 
              <DropZone data={data} dispatch={dispatchData} /></Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit} type="submit"  >
            Edit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

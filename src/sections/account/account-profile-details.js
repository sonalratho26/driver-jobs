import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editUserActions, fetchUserActions } from 'src/features/userSlice.js/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { Router } from 'next/router';
import { useRouter } from 'next/router';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const LoginData = JSON.parse(localStorage.getItem("loginDetails"));

  const userData = useSelector((state) => state?.user?.fetchUserReducer) || []
  const edituserData = useSelector((state) => state?.user?.putUserEditDataR) || []
  const jobData = useSelector((state) => state?.job?.createJob)


  useEffect(() => {
    if (edituserData?.statusCode === "200") {
      toast.success(edituserData?.message);
      setTimeout(() => {
        router.push("/")
      }, 2000);
    
     
    } else if (edituserData?.status === "failed") {
      toast.error(edituserData?.message);
    }
  }, [edituserData]);


  useEffect(() => {
    dispatch(fetchUserActions());
  }, [dispatch]);

  const  EditData = userData?.filter((data) => data.user_id === LoginData.id).map((data) => {
  return data
  }
  )


  const [values, setValues] = useState({});
  let SetEditData 

  useEffect(() =>{
    SetEditData = EditData?.map((data) => {
      setValues({
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        address: data?.address,
        password: data?.password
      })
    })
  },[])
  // const handleChange = useCallback(
  //   (event) => {
  //     setValues((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value
  //     }));
  //   },
  //   []
  // );

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
   
  };

  const formData = new FormData();
  const handleSubmit = (event) => {
   
    event.preventDefault()
    // setValidatedata(true);
    // setErrors(validate(values));
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("mobile", values.mobile);
    formData.append("address", values.address);
    formData.append("image_src",LoginData?.image_src)
    if (values.name !== undefined && values.email != undefined &&  values.password !== undefined && values.mobile !== undefined
       &&  values.address !== undefined) {
      dispatch(editUserActions(formData))
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <ToastContainer/>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
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
                <TextField
                  fullWidth
                  helperText="Please specify the  name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="mobile"
                  onChange={handleChange}
                  type="number"
                  value={values.mobile}
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> */}
                 <TextField
                 type='password'
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  value={values.password}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

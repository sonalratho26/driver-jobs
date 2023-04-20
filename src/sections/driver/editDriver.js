import { useCallback, useEffect, useRef, useState } from "react";
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
  FormHelperText,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import validate from "src/utils/createDriverValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchJopActions } from "src/features/jobs/jobsSlice";
import { createDriverActions } from "src/features/drivers/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { editUserActions, getEditDataAction } from "src/features/userSlice.js/userSlice";
import editvalidate from "src/utils/editDriverValidation";

const role = [
  {
    value: 0,
    label: "Admin",
  },
  {
    value: 1,
    label: "Driver",
  },
];

export const EditDriver = () => {
  // const [values, setValues] = useState({
  //   firstName: 'Anika',
  //   lastName: 'Visser',
  //   email: 'demo@devias.io',
  //   phone: '',
  //   state: 'los-angeles',
  //   country: 'USA'
  // });

  const jobData = useSelector((state) => state?.job?.fetchJobReducer) || [];
  const editData = useSelector((state) => state?.user?.editDataR);

  const edituserData = useSelector((state) => state?.user?.putUserEditDataR);


  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [reviews, setReviews] = useState(false);
  const [img, setImg] = useState(editData.image_src);
  const driver_id = localStorage.getItem("driver_id");


  useEffect(() => {
    dispatch(fetchJopActions());
    dispatch(getEditDataAction(driver_id));
  }, [dispatch]);

  useEffect(() => {
    setValues({
      deleteflag: editData.deleteflag,
      email: editData.email,
      image_src: editData.image_src,
      isactive: editData.isactive,
      job_id: editData.job_id,
      name: editData.name,
      password: editData.password,
      confirmPassword: editData.password,
      mobile: editData.mobile,
      role_id: editData.role_id,
      updateddate: editData.updateddate,
      uuid: editData.user_uuid,
      address: editData.address,
    });
  }, [editData]);
  const driverData = useSelector((state) => state?.driver?.createDriver);

  useEffect(() => {
    if (edituserData?.statusCode === "200") {
      toast.success(edituserData?.message);
      setTimeout(() => {
        router.push("/drivers");
      }, 2000);
    } else if (edituserData?.status === "failed") {
    }
  }, [edituserData]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    setImg(file);
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      setReviews("select valid image type.");
      return false;
    }
    if (file.size > 307200) {
      setReviews("select valid size of image.");
      return false;
    }
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setReviews(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const [file, setFile] = useState(null);

  const handleChangeImage = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  let dataval = Object.keys(errors).length === 0 && errors.constructor === Object;

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (!dataval) {
      setErrors(editvalidate(values));
    }
  };



  const formData = new FormData();
  let imagefile = editData.image_src;
  let filedata = img ? img : imagefile;
  const handleSubmit = () => {
    setValidatedata(true);
    setErrors(editvalidate(values));
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("mobile", values.mobile);
    formData.append("job_id", values.job_id);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("image_src", filedata);
    formData.append("address", values.address);
   
    if (
      values.name !== undefined &&
      values.email != undefined &&
      values.role_id !== undefined &&
      values.password !== undefined &&
      values.mobile !== undefined &&
      values.job_id !== undefined &&
      values.confirmPassword !== undefined &&
      img !== null &&
      values.address !== undefined && filedata !== null
    ) {
       dispatch(editUserActions(formData));
    }
  };

  useEffect(() => {
    if (validateData) {
      setErrors(editvalidate(values));
    }
  }, [values]);
  const reviewsHandler = () => {
    if (!img || filedata === undefined || filedata === null) {
      setReviews(true);
      setReviews("select image.");
      return false;
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
    // <form
    //   autoComplete="off"
    //   noValidate
    //   onSubmit={handleSubmit}
    // >
    <>
      <ToastContainer />
      <Card>
        <CardHeader title="Edit Driver" />

        <CardContent sx={{ pt: 0 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="form-img">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              
              />
              <label htmlFor="upload">
                <div className="form-img-input" onClick={() => imageUploader.current.click()}>
                  <img
                    ref={uploadedImage}
                    src={"data:image/png;base64," + editData.image_src}
                    value
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absoulte",
                    }}
                  />
                </div>
              </label>
            </div>
            <FormHelperText sx={{ color: "red" }}>{reviews}</FormHelperText>
          </Box>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={values.name || ""}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email || ""}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  type="number"
                  onChange={handleChange}
                  value={values.mobile || ""}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  maxlength="10"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password || ""}
                  error={!!errors.password}
                  helperText={errors.password}
                  autocomplete="new-password"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  value={values.confirmPassword || ""}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  name="role_id"
                  value={values.role_id}
                  error={!!errors.role_id}
                  helperText={errors.role_id}
                >
                  <option value="" disabled selected hidden></option>
                  {role.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Assign Jobs"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  name="job_id"
                  value={values.job_id}
                  error={!!errors.job_id}
                  helperText={errors.job_id}
                >
                  <option value="" disabled selected hidden></option>
                  {jobData.length > 0 &&
                    jobData?.map((data, id) => (
                      <option value={data.job_id} key={id}>
                        {data.name}
                      </option>
                    ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Address"
                  multiline
                  rows={4}
                  defaultValue="Address"
                  name="address"
                  onChange={handleChange}
                  value={values.address || ""}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
              reviewsHandler();
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      {/* </form> */}
    </>
  );
};

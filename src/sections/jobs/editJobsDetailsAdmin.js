import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
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
} from "@mui/material";
import validate from "src/utils/addJobValidation";
import DropZone from "src/components/DropZone";
import {
  editDriveJobActions,
  editJobActions,
  fetchJobImageByidActions,
  getEditDataAction,
} from "src/features/jobs/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FilePreview from "src/components/FilePreview";
import styles from "../../styles/FilePreview.module.css";
import { fetchUserActions } from "src/features/userSlice.js/userSlice";
const status = [
  {
    value: "done",
    label: "Done",
  },
  {
    value: "notDone",
    label: "Not Done",
  },
];

const location = [
  {
    value: "location_1",
    label: "Location 1",
  },
  {
    value: "location_2",
    label: "Location 2",
  },
  {
    value: "location_3",
    label: "Location 3",
  },
  {
    value: "location_4",
    label: "Location 4",
  },
  {
    value: "location_5",
    label: "Location 5",
  },
];

export const EditJobsDetailsAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const job_id = localStorage.getItem("job_id");
  const editData = useSelector((state) => state?.job?.editDataR);
  const editDataLog = JSON.parse(localStorage.getItem("editData"));
  const [values, setValues] = useState(editData);
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);

  useEffect(() => {
    setValues(editData);
  }, [editData]);

  useEffect(() => {
    if (validateData) {
      setErrors(validate(values));
    }
  }, [values]);
  const formData = new FormData();

  const driver_data = useSelector((state) => state?.user?.fetchUserReducer) || [];
  const jobData = useSelector((state) => state?.job?.putUserEditDataR);
  const jobImageData = useSelector((state) => state?.job?.imageDataById);






  useEffect(() => {
    if (jobData?.statusCode === "200") {
      toast.success(jobData?.message);
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    } else if (jobData?.status === "failed") {
    }
  }, [jobData]);

  useEffect(() => {
    dispatch(fetchJobImageByidActions(job_id));
    dispatch(getEditDataAction(job_id));
    dispatch(fetchUserActions());
  }, [dispatch]);

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

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidatedata(true);
    setErrors(validate(values));
    formData.append("name", values.name);
    formData.append("assign_status", values.assign_status);
    formData.append("driver_id", values.driver_id);
    formData.append("description", values.description);
    formData.append("job_location", values.job_location);
    if (
      values.name !== undefined &&
      values.assign_status != null &&
      values.driver_id !== null &&
      values.description !== undefined &&
      values.job_location !== null
    ) {
      dispatch(editJobActions(formData));
    }
  };

  return (
    // <form autoComplete="off" noValidate enctype="multipart/form-data" method="post">
    <>
      <ToastContainer />
      <Card>
        <CardHeader subheader="The information can be edited" title="Edit job" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={1}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job name"
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
                  label="Select Driver"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  name="driver_id"
                  value={values.driver_id || ""}
                  error={!!errors.driver_id}
                  helperText={errors.driver_id}
                >
                  <option value="" disabled selected hidden></option>
                  {driver_data.length > 0 &&
                    driver_data?.map((data, id) => {
                      if (data.role_id == 1) {
                        return (
                          <option value={data.user_id} key={id}>
                            {data.name}
                          </option>
                        );
                      }
                    })}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select Location"
                  name="job_location"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.job_location || ""}
                  error={!!errors.job_location}
                  helperText={errors.job_location}
                >
                  <option value="" disabled selected hidden></option>
                  {location.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select Status"
                  name="assign_status"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.assign_status || ""}
                  error={!!errors.assign_status}
                  helperText={errors.assign_status}
                >
                  <option value="" disabled selected hidden></option>
                  {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
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
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid xs={24} md={12}>
                <div className={styles.fileListImages}>
                  <div>
                    {/* loop over the fileData */}
                    {jobImageData.length > 0 &&
                      jobImageData.map((f) => {
                        return (
                          <ol key={f.lastModified}>
                            <li
                              style={{
                                listStyle: "none",
                                display: "inline",
                                float: "left",
                                margin: "0 5px",
                              }}
                            >
                              {/* display the filename and type */}
                              <div key={f.name}>
                                {f.name}
                                <img
                                  className={styles.roundedmd}
                                  src={"data:image/png;base64," + f?.images}
                                />
                              </div>
                            </li>
                          </ol>
                        );
                      })}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit} type="submit">
            Edit
          </Button>
        </CardActions>
      </Card>
      </>
    // </form>
  );
};

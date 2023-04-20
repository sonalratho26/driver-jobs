import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import loginValidate from "src/utils/loginFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginUserActions } from "src/features/userSlice.js/userSlice";
import { userRole } from "src/constants/userRoles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const [SubmitDisabled, setSubmitDisabled] = useState(null);

  const userData = JSON.parse(localStorage.getItem("loginDetails"));
  const userRoleID = userData?.role_id || "";
  const LoginData = useSelector((state) => state?.user?.data);
  //   if (userRoleID === userRole.ADMIN) {
  //     // setTimeout(() => {
  //     //   router.push('/')
  //     //   window.location.reload();
  //     // }, 2000);
  // console.log("newwwwww");
  //     localStorage.setItem("UserRole", "admin");
  //     localStorage.setItem("role_id",userData?.role_id)
  //     // localStorage.setItem("token", userData?.accessToken);
  //   } else if (userRoleID === userRole.DRIVER) {
  //     // setTimeout(() => {
  //     //   router.push('/')
  //     //   window.location.reload();
  //     // }, 2000);
  //     // window.location.reload()
  //     localStorage.setItem("UserRole", "driver");
  //     localStorage.setItem("role_id",userData?.role_id)
  //     // localStorage.setItem("token", userData?.accessToken);
  //     // localStorage.setItem("UUID", userData?.uuid);
  //     // localStorage.setItem(
  //     //   "WorkerData",
  //     //   JSON.stringify(userData?.worker_data)
  //     // );
  //     // localStorage.setItem("UUID", userData?.uuid);
  //     // localStorage.setItem("email", values.email);
  //     // localStorage.setItem(
  //     //   "WorkerData",
  //     //   JSON.stringify(userData?.worker_data)
  //     // );
  //     // localStorage.setItem("img", userData?.profile);
  //     // localStorage.setItem("name", userData?.name);
  //     // localStorage.setItem("id", JSON.stringify(userData?.id));
  //   }
  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (validateData) {
      setErrors(loginValidate(values));
    }
  };
  const formData = new FormData();

  const Submit = (e) => {
    e.preventDefault();
    setErrors(loginValidate(values));
    setSubmitDisabled(true);
    setValidatedata(true);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.email !== "" && values.password !== "") {
      dispatch(loginUserActions(formData));
    
    }
  };

  useEffect(() => {
    if (LoginData?.statusCode === "200") {
      toast.success(LoginData?.message);
      setSubmitDisabled(true);
      setTimeout(() => {
        setTimeout(() => {
          router.push("/");
  
        }, 1500);
      }, 1500);
    } else if (LoginData?.status === "failed") {
      setSubmitDisabled(true);
      setTimeout(() => {
        setSubmitDisabled(false);
      }, 1500);
    }
  }, [LoginData]);

  return (
    <>
      <Head>
        <title>Login | Driver Jobs</title>
      </Head>
      <ToastContainer className="ToastContainer" position="top-right" autoClose={1500} limit={1} />
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              {/* <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography> */}
            </Stack>
            <form noValidate>
              <Stack spacing={3}>
                <TextField
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email}
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={values.email || " "}
                />
                <TextField
                  error={!!errors.password}
                  fullWidth
                  helperText={errors.password}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password || ""}
                />
              </Stack>

              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                onClick={Submit}
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;

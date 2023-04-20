import { useCallback, useEffect, useMemo, useState, useReducer } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Popover,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import CustomersSearch from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobActions, fetchJobByDriverId, fetchJopActions, getEditDataAction } from "src/features/jobs/jobsSlice";
import { applySortFilter } from "src/utils/apply-sortfilter";
import { getComparator } from "src/utils/get-comparator";
import Iconify from "src/components/iconify/Iconify";
import { useRouter } from "next/router";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { userRole } from "src/constants/userRoles";
const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    // createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Food Delivery ",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    // createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Package Delivery",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    // createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Courier",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    // createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Floral Delivery",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    // createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Newspaper Delivery",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    // createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Mail Carrier",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    // createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    // createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    // createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    // createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const TABLE_HEAD = [
  { id: "id", label: "Job Id", alignRight: false },
  { id: "name", label: "Job Name", alignRight: false },
  { id: "driverName", label: "Driver Name", alignRight: false },
  { id: "assign_status", label: "Assign Status", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
];

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");
  const isAuthenticated = parseInt(window.localStorage.getItem("role_id"));

  const jobsDataAdmin = useSelector((state) => state?.job?.fetchJobReducer) || [];

  const deletejobData = useSelector((state) => state?.job?.deleteJob) || [];

  const jobs_by_driverId =  useSelector((state) => state?.job?.jobByDriverId) || [];

  const jobData = userRole.ADMIN === isAuthenticated ? jobsDataAdmin : jobs_by_driverId

  const userData = JSON.parse(localStorage.getItem("loginDetails"));

  useEffect(() => {
    if (deletejobData?.statusCode === "200") {
      toast.success(deletejobData?.message);
      setTimeout(() => {
        dispatch(fetchJopActions());
      }, 2000);
    } else if (deletejobData?.status === "failed") {
    }
  }, [deletejobData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = jobData?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

 
  useEffect(() => {
    if (userRole.ADMIN === isAuthenticated) {
      dispatch(fetchJopActions());
    } else {
      dispatch(fetchJobByDriverId(userData?.id))
    }  
    window.scrollTo(0, 0);
  }, [dispatch]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(jobData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(jobData, page, rowsPerPage);
    }, [page, rowsPerPage, jobData]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers?.length > 0 && customers.map((customer) => customer.id);
    }, [customers]);
  };

  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const job_id = localStorage.getItem("job_id");
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handelDelete = () => {
    setOpenDialog(false);
    dispatch(deleteJobActions(job_id));
    setOpen(null);
  };

  const handleOpenMenu = (event, id, data) => {
    localStorage.setItem("job_id", id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const editData = () => {
    if (userRole.ADMIN === isAuthenticated) {
      router.push("/editJobsAdmin");
    } else {
      router.push("/editJobs");
    }
  };

  return (
    <>
      <Head>
        <title>Jobs | Driver Jobs</title>
      </Head>
      <ToastContainer position="top-right" className="ToastContainer" autoClose={1500} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Jobs</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Add Job
                </Button>
              </div> */}
            </Stack>

            <CustomersSearch
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <CustomersTable
              count={jobData.length}
              items={filteredUsers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              emptyRows={emptyRows}
              isNotFound={isNotFound}
              filterName={filterName}
              order={order}
              orderBy={orderBy}
              rowCount={jobData.length}
              headLabel={TABLE_HEAD}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              handleClick={handleClick}
              onSelected={selected}
              handleOpenMenu={handleOpenMenu}
            />
          </Stack>
        </Container>
      </Box>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} onClick={editData} />
          Edit
        </MenuItem>
        {userRole.ADMIN === isAuthenticated && (
          <MenuItem sx={{ color: "error.main" }}>
            <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} onClick={handleClickOpen} />
            Delete
          </MenuItem>
        )}
      </Popover>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete these record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button type="submit" variant="contained" onClick={handelDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Job</DialogTitle>
        <DialogContent>
            <Stack spacing={3}>
              <TextField fullWidth label="Job name" name="jobname" type="text"   onChange={handleChange}
                value={values.jobname || ""} 
                error={!!(errors.jobname)}
                  helperText={errors.jobname} />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Driver List</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="drivers"
                  onChange={handleChange}
                  value={values.drivers || ""}
                  error={!!(errors.drivers)}
                  helperText={errors.drivers}
                >
                  <MenuItem value="Ram">Ram</MenuItem>
                  <MenuItem value="Mayur">Mayur</MenuItem>
                  <MenuItem value="Jivan">Jivan</MenuItem>
                </Select>
                <FormHelperText sx={{color:"red"}}>{errors.drivers}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assign Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  onChange={handleChange}
                  value={values.status || ""}
                  error={!!(errors.status)}
                  helperText={errors.status}
                >
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                </Select>
                <FormHelperText sx={{color:"red"}}>{errors.status}</FormHelperText>
              </FormControl>
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
            </Stack>
            <DropZone data={data} dispatch={dispatch} />
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
        </DialogContent>
        <DialogActions>
           
            </DialogActions>
      </Dialog> */}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

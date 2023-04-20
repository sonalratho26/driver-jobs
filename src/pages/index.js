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
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import validate from "src/utils/addJobValidation";
import DropZone from "src/components/DropZone";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobByDriverId,
  fetchJopActions,
  getReprtAdminActions,
  getReprtDriverActions,
} from "src/features/jobs/jobsSlice";
import { ReportsTable } from "src/sections/reports/reports-table";
import ReportsSearch from "src/sections/reports/reports-search";
import { DatePicker } from "@mui/x-date-pickers";
import { userRole } from "src/constants/userRoles";
import { applySortFilter } from "src/utils/apply-sortfilter";
import { getComparator } from "src/utils/get-comparator";
import { fetchUserActions } from "src/features/userSlice.js/userSlice";
import { useRouter } from "next/router";

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

const TABLE_HEAD = [
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

  const isAuthenticated = parseInt(window.localStorage.getItem("role_id"));
  const jobAdminData = useSelector((state) => state?.job?.fetchJobReducer) || [];

  const jobs_by_driverId = useSelector((state) => state?.job?.jobByDriverId) || [];

  const jobAllData = userRole.ADMIN === isAuthenticated ? jobAdminData : jobs_by_driverId;

  const localData = JSON.parse(localStorage.getItem("loginDetails"));

  const jobReportsDataAdmin = useSelector((state) => state?.job?.reportData);

  const jobsReportsDataDriver = useSelector((state) => state?.job?.reportDataDriver);

  const jobReportsData =
    userRole.ADMIN === isAuthenticated ? jobReportsDataAdmin : jobsReportsDataDriver;

  const jobData =
    jobReportsData !== undefined && jobReportsData.length > 0
      ? jobReportsData
      : jobReportsData === undefined
      ? {}
      : jobAllData;

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const userData = useSelector((state) => state?.user?.fetchUserReducer) || [];

  let loginData = useSelector((state) => state?.user?.data);

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
      dispatch(fetchJobByDriverId(localData?.id));
    }
    dispatch(fetchUserActions());
    window.scrollTo(0, 0);
  }, [dispatch]);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(jobData, getComparator(order, orderBy), filterName);

  const isNotFound = (!filteredUsers.length && !!filterName) || jobReportsData === undefined;

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const formData = new FormData();

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("location", values.location);
    if (userRole.ADMIN === isAuthenticated) {
      dispatch(getReprtAdminActions(values));
    } else {
      dispatch(getReprtDriverActions(values));
    }
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleReset = () => {
    router.reload(window.location.pathname);
  };
  return (
    <>
      <Head>
        <title>Jobs | Driver Jobs</title>
      </Head>
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
              <Stack spacing={4}>
                <Typography variant="h4">Jobs Reports</Typography>
                <Stack alignItems="center" direction="row" spacing={2}>
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
                  {isAuthenticated === userRole.ADMIN && (
                    <TextField
                      fullWidth
                      label="Select Driver"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      name="driverName"
                      value={values.driverName || ""}
                    >
                      <option value="" disabled selected hidden></option>
                      {userData.length > 0 &&
                        userData?.map((data, id) => {
                          if (data.role_id == 1) {
                            return (
                              <option value={data.user_id} key={id}>
                                {data.name}
                              </option>
                            );
                          }
                        })}
                    </TextField>
                  )}

                  <TextField
                    type="date"
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    onChange={handleChange}
                    required
                  ></TextField>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="endDate"
                    onChange={handleChange}
                    required
                  ></TextField>
                  <TextField
                    fullWidth
                    label="Select Location"
                    name="location"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value="" disabled selected hidden></option>
                    {location.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Filter
                  </Button>
                  <Button variant="contained" type="submit" onClick={handleReset}>
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <ReportsSearch
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <ReportsTable
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
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

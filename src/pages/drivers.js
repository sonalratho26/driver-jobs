import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, FormHelperText, Popover, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import validate from 'src/utils/createDriverValidation';
import { DriverTable } from 'src/sections/driver/driver-table';
import  DriverSearch  from 'src/sections/driver/driver-search';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserActions, fetchUserActions } from 'src/features/userSlice.js/userSlice';
import { cutomerIds } from 'src/utils/apply-customerIds';
import { applySortFilter } from 'src/utils/apply-sortfilter';
import { getComparator } from 'src/utils/get-comparator';
import Iconify from 'src/components/iconify/Iconify';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097',
    assign:"Assigned"
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711',
    assign:"Not Assigned"
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682',
    assign:"Not Assigned"
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242',
    assign:"Not Assigned"
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106',
    assign:"Assigned"
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409',
    assign:"Not Assigned"
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647',
    assign:"Assigned"
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654',
    assign:"Not Assigned"
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947',
    assign:"Not Assigned"
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894',
    assign:"Not Assigned"
  }
];

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "signed_up", label: "Signed Up", alignRight: false },
  { id: "job_status", label: "Job Status", alignRight: false }
];



const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const driver_id = localStorage.getItem("driver_uuid");
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const userData = useSelector((state) => state?.user?.fetchUserReducer) || []
  const deleteData = useSelector((state) => state?.user?.deleteUserById)

  let driverData = useSelector((state) => state?.driver?.createDriver)

  useEffect(() => {
    if (deleteData?.statusCode === "200") {
      toast.success(deleteData?.message);
      setTimeout(() => {
        router.reload(window.location.pathname)
      }, 2000);
    } else if (deleteData?.status === "failed") {
    }
  }, [deleteData]);



  useEffect(() => {
    dispatch(fetchUserActions());
    driverData = []
    window.scrollTo(0, 0);
  }, [dispatch]);


  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(userData, page, rowsPerPage);
      },
      [page, rowsPerPage ,userData]
    );
  };

  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return  cutomerIds(customers);
      },
      [customers]
    );
  };




  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData?.map((n) => n.name);
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


  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const filteredUsers = applySortFilter(userData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenMenu = (event,id,uuid) => {
    localStorage.setItem("driver_id",id)
    localStorage.setItem("driver_uuid",uuid)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const editData = () =>{
    router.push("/editDriver")
  
  }
  const handelDelete = () => {
    setOpenDialog(false);
    dispatch(deleteUserActions(driver_id))
    setOpen(null);
  }

  return (
    <>
      <Head>
        <title>
          Drivers | Driver Jobs
        </title>
      </Head>
      <ToastContainer position="top-right"
        className="ToastContainer"
        autoClose={1500}/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Drivers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Create Driver
                </Button>
              </div> */}
            </Stack>
            <DriverSearch  numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}/>
            <DriverTable
              count={userData.length}
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
              rowCount={userData.length}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} onClick={editData}/>
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} onClick={handleClickOpen}/>
          Delete
        </MenuItem>
      </Popover>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to Delete these record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button   
              type="submit"
              variant="contained" onClick={handelDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={open} onClose={handleClose}   fullWidth>
        <DialogTitle sx={{textAlign:"center"}}>Add Driver</DialogTitle>
        <DialogContent>
            <Stack spacing={3}>
            <div className="form-img">
          <TextField
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none",
            }}
          />
          <div
            className="form-img-input"
            onClick={() => imageUploader.current.click()}
          >
            <img
              ref={uploadedImage}
              value
              style={{
                width: "100%",
                height: "100%",
                position: "absoulte",
              }}
            />
           <FormHelperText sx={{color:"red"}}>{reviews}</FormHelperText>
          </div>
        </div>
              <TextField fullWidth label="Name" name="name" type="text"   onChange={handleChange}
                value={values.name || ""} error={!!(errors.name)}
                helperText={errors.name} />
                 <TextField fullWidth label="Email" name="email" type="email"   onChange={handleChange}
                value={values.email || ""}  error={!!(errors.email)}
                helperText={errors.email}/>
                 <TextField fullWidth label="Mobile" name="mobile" type="number"   onChange={handleChange}
                value={values.mobile || ""}  error={!!(errors.mobile)}
                helperText={errors.mobile} maxlength="10"/>
                 <TextField fullWidth label="Password" name="password" type="password"   onChange={handleChange}
                value={values.password || ""}  error={!!(errors.password)}
                helperText={errors.password}/>
                 <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password"   onChange={handleChange}
                value={values.confirmPassword || ""}  error={!!(errors.confirmPassword)}
                helperText={errors.confirmPassword}/>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role_id"
                  onChange={handleChange}
                  value={values.role_id || ""}
                  error={!!(errors.role_id)}
                  helperText={errors.role_id}
                >
                  <MenuItem value={0}>Admin</MenuItem>
                  <MenuItem value={1}>Driver</MenuItem>
                </Select>
                <FormHelperText sx={{color:"red"}}>{errors.role_id}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assign Jobs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="jobs"
                  onChange={handleChange}
                  value={values.jobs || ""}
                  error={!!(errors.jobs)}
                  helperText={errors.jobs}
                >
                  <MenuItem value="foodDelivery">Food Delivery</MenuItem>
                  <MenuItem value="customeDelivery">Custome Delivery</MenuItem>
                </Select>
                <FormHelperText sx={{color:"red"}}>{errors.jobs}</FormHelperText>
              </FormControl>
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
                error={!!(errors.address)}
                  helperText={errors.address}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={ () => {handleSubmit();reviewsHandler()}}
            >
              Submit
            </Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

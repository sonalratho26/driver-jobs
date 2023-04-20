// import { useCallback, useEffect, useMemo, useState ,useReducer} from "react";
// import Head from "next/head";
// import { subDays, subHours } from "date-fns";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
// import {
//   Box,
//   Button,
//   Container,
//   FormHelperText,
//   InputAdornment,
//   OutlinedInput,
//   Stack,
//   SvgIcon,
//   Typography,
// } from "@mui/material";
// import { useSelection } from "src/hooks/use-selection";
// import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// import { CustomersTable } from "src/sections/customer/customers-table";
// import { CustomersSearch } from "src/sections/customer/customers-search";
// import { applyPagination } from "src/utils/apply-pagination";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import validate from "src/utils/addJobValidation";
// import DropZone from "src/components/DropZone";
// import styles from "../styles/Home.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJopActions } from "src/features/jobs/jobsSlice";

// const now = new Date();

// const data = [
//   {
//     id: "5e887ac47eed253091be10cb",
//     address: {
//       city: "Cleveland",
//       country: "USA",
//       state: "Ohio",
//       street: "2849 Fulton Street",
//     },
//     avatar: "/assets/avatars/avatar-carson-darrin.png",
//     // createdAt: subDays(subHours(now, 7), 1).getTime(),
//     email: "carson.darrin@devias.io",
//     name: "Food Delivery ",
//     phone: "304-428-3097",
//   },
//   {
//     id: "5e887b209c28ac3dd97f6db5",
//     address: {
//       city: "Atlanta",
//       country: "USA",
//       state: "Georgia",
//       street: "1865  Pleasant Hill Road",
//     },
//     avatar: "/assets/avatars/avatar-fran-perez.png",
//     // createdAt: subDays(subHours(now, 1), 2).getTime(),
//     email: "fran.perez@devias.io",
//     name: "Package Delivery",
//     phone: "712-351-5711",
//   },
//   {
//     id: "5e887b7602bdbc4dbb234b27",
//     address: {
//       city: "North Canton",
//       country: "USA",
//       state: "Ohio",
//       street: "4894  Lakeland Park Drive",
//     },
//     avatar: "/assets/avatars/avatar-jie-yan-song.png",
//     // createdAt: subDays(subHours(now, 4), 2).getTime(),
//     email: "jie.yan.song@devias.io",
//     name: "Courier",
//     phone: "770-635-2682",
//   },
//   {
//     id: "5e86809283e28b96d2d38537",
//     address: {
//       city: "Madrid",
//       country: "Spain",
//       name: "Anika Visser",
//       street: "4158  Hedge Street",
//     },
//     avatar: "/assets/avatars/avatar-anika-visser.png",
//     // createdAt: subDays(subHours(now, 11), 2).getTime(),
//     email: "anika.visser@devias.io",
//     name: "Floral Delivery",
//     phone: "908-691-3242",
//   },
//   {
//     id: "5e86805e2bafd54f66cc95c3",
//     address: {
//       city: "San Diego",
//       country: "USA",
//       state: "California",
//       street: "75247",
//     },
//     avatar: "/assets/avatars/avatar-miron-vitold.png",
//     // createdAt: subDays(subHours(now, 7), 3).getTime(),
//     email: "miron.vitold@devias.io",
//     name: "Newspaper Delivery",
//     phone: "972-333-4106",
//   },
//   {
//     id: "5e887a1fbefd7938eea9c981",
//     address: {
//       city: "Berkeley",
//       country: "USA",
//       state: "California",
//       street: "317 Angus Road",
//     },
//     avatar: "/assets/avatars/avatar-penjani-inyene.png",
//     // createdAt: subDays(subHours(now, 5), 4).getTime(),
//     email: "penjani.inyene@devias.io",
//     name: "Mail Carrier",
//     phone: "858-602-3409",
//   },
//   {
//     id: "5e887d0b3d090c1b8f162003",
//     address: {
//       city: "Carson City",
//       country: "USA",
//       state: "Nevada",
//       street: "2188  Armbrester Drive",
//     },
//     avatar: "/assets/avatars/avatar-omar-darboe.png",
//     // createdAt: subDays(subHours(now, 15), 4).getTime(),
//     email: "omar.darobe@devias.io",
//     name: "Omar Darobe",
//     phone: "415-907-2647",
//   },
//   {
//     id: "5e88792be2d4cfb4bf0971d9",
//     address: {
//       city: "Los Angeles",
//       country: "USA",
//       state: "California",
//       street: "1798  Hickory Ridge Drive",
//     },
//     avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
//     // createdAt: subDays(subHours(now, 2), 5).getTime(),
//     email: "siegbert.gottfried@devias.io",
//     name: "Siegbert Gottfried",
//     phone: "702-661-1654",
//   },
//   {
//     id: "5e8877da9a65442b11551975",
//     address: {
//       city: "Murray",
//       country: "USA",
//       state: "Utah",
//       street: "3934  Wildrose Lane",
//     },
//     avatar: "/assets/avatars/avatar-iulia-albu.png",
//     // createdAt: subDays(subHours(now, 8), 6).getTime(),
//     email: "iulia.albu@devias.io",
//     name: "Iulia Albu",
//     phone: "313-812-8947",
//   },
//   {
//     id: "5e8680e60cba5019c5ca6fda",
//     address: {
//       city: "Salt Lake City",
//       country: "USA",
//       state: "Utah",
//       street: "368 Lamberts Branch Road",
//     },
//     avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
//     // createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: "nasimiyu.danai@devias.io",
//     name: "Nasimiyu Danai",
//     phone: "801-301-7894",
//   },
// ];



// const Page = () => {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const jobData = useSelector((state) => state?.job?.fetchJobReducer) || []
 
 
//     useEffect(() => {
//       dispatch(fetchJopActions());
//       window.scrollTo(0, 0);
//     }, [dispatch]);
//     const useCustomers = (page, rowsPerPage) => {
//       return useMemo(() => {
//         return applyPagination(jobData, page, rowsPerPage);
//       }, [page, rowsPerPage,jobData]);
//     };
    
//     const useCustomerIds = (customers) => {
//       return useMemo(() => {
//         return customers?.length > 0 && customers.map((customer) => customer.id);
//       }, [customers]);
//     };
 

//   const customers = useCustomers(page, rowsPerPage);
//   const customersIds = useCustomerIds(customers);
//   const customersSelection = useSelection(customersIds);
//   const [open, setOpen] = useState(false);



//   const handlePageChange = useCallback((event, value) => {
//     setPage(value);
//   }, []);

//   const handleRowsPerPageChange = useCallback((event) => {
//     setRowsPerPage(event.target.value);
//   }, []);




//   return (
//     <>
//       <Head>
//         <title>Jobs | Driver Jobs</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={3}>
//             <Stack direction="row" justifyContent="space-between" spacing={4}>
//               <Stack spacing={1}>
//                 <Typography variant="h4">Jobs</Typography>
//                 <Stack alignItems="center" direction="row" spacing={1}>
//                   <Button
//                     color="inherit"
//                     startIcon={
//                       <SvgIcon fontSize="small">
//                         <ArrowUpOnSquareIcon />
//                       </SvgIcon>
//                     }
//                   >
//                     Import
//                   </Button>
//                   <Button
//                     color="inherit"
//                     startIcon={
//                       <SvgIcon fontSize="small">
//                         <ArrowDownOnSquareIcon />
//                       </SvgIcon>
//                     }
//                   >
//                     Export
//                   </Button>
//                 </Stack>
//               </Stack>
//               {/* <div>
//                 <Button
//                   startIcon={
//                     <SvgIcon fontSize="small">
//                       <PlusIcon />
//                     </SvgIcon>
//                   }
//                   variant="contained"
//                   onClick={handleClickOpen}
//                 >
//                   Add Job
//                 </Button>
//               </div> */}
//             </Stack>
//             <CustomersSearch />
//             <CustomersTable
//               count={jobData.length}
//               items={customers}
//               onDeselectAll={customersSelection.handleDeselectAll}
//               onDeselectOne={customersSelection.handleDeselectOne}
//               onPageChange={handlePageChange}
//               onRowsPerPageChange={handleRowsPerPageChange}
//               onSelectAll={customersSelection.handleSelectAll}
//               onSelectOne={customersSelection.handleSelectOne}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               selected={customersSelection.selected}
//             />
//           </Stack>
//         </Container>
//       </Box>
//       {/* <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>Create Job</DialogTitle>
//         <DialogContent>
//             <Stack spacing={3}>
//               <TextField fullWidth label="Job name" name="jobname" type="text"   onChange={handleChange}
//                 value={values.jobname || ""} 
//                 error={!!(errors.jobname)}
//                   helperText={errors.jobname} />
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Driver List</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   name="drivers"
//                   onChange={handleChange}
//                   value={values.drivers || ""}
//                   error={!!(errors.drivers)}
//                   helperText={errors.drivers}
//                 >
//                   <MenuItem value="Ram">Ram</MenuItem>
//                   <MenuItem value="Mayur">Mayur</MenuItem>
//                   <MenuItem value="Jivan">Jivan</MenuItem>
//                 </Select>
//                 <FormHelperText sx={{color:"red"}}>{errors.drivers}</FormHelperText>
//               </FormControl>
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Assign Status</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   name="status"
//                   onChange={handleChange}
//                   value={values.status || ""}
//                   error={!!(errors.status)}
//                   helperText={errors.status}
//                 >
//                   <MenuItem value="Assigned">Assigned</MenuItem>
//                   <MenuItem value="Not Assigned">Not Assigned</MenuItem>
//                 </Select>
//                 <FormHelperText sx={{color:"red"}}>{errors.status}</FormHelperText>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 id="outlined-multiline-static"
//                 label="Description"
//                 multiline
//                 rows={4}
//                 defaultValue="Description"
//                 name="description"
//                 onChange={handleChange}
//                 value={values.description || ""}
//                 error={!!(errors.description)}
//                   helperText={errors.description}
//               />
//             </Stack>
//             <DropZone data={data} dispatch={dispatch} />
//             <Button
//               fullWidth
//               size="large"
//               sx={{ mt: 3 }}
//               type="submit"
//               variant="contained"
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>
//         </DialogContent>
//         <DialogActions>
           
//             </DialogActions>
//       </Dialog> */}
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;


// import { Helmet } from 'react-helmet-async';

import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/user/index';
// mock
import USERLIST from '../utils/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------






const Page = () => {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar 
          numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
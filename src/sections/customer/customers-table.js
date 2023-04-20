import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserActions } from "src/features/userSlice.js/userSlice";
import { useEffect } from "react";
import Iconify from "src/components/iconify/Iconify";

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    isNotFound,
    emptyRows = [],
    filterName,
    order,
    orderBy,
    rowCount,
    headLabel,
    numSelected,
    onRequestSort,
    onSelectAllClick,
    handleClick,
    onSelected = [],
    handleOpenMenu
  } = props;
  const dispatch = useDispatch();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const userData = useSelector((state) => state?.user?.fetchUserReducer) || [];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  useEffect(() => {
    dispatch(fetchUserActions());
  }, [dispatch]);
  return (
    <>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={rowCount > 0 && numSelected === rowCount}
                      onChange={onSelectAllClick}
                    />
                  </TableCell>
                  {headLabel.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.alignRight ? "right" : "left"}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        hideSortIcon
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box sx={{ ...visuallyHidden }}>
                            {order === "desc" ? "sorted descending" : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.length > 0 &&
                  items?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => {
                    // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
                    const { job_id, name, driver_id, assign_status, description,job_location } = customer;
                    const driverName =
                      userData.length > 0 &&
                      userData
                        ?.filter((data) => data.user_id === driver_id)
                        .map((data) => {
                          return data.name;
                        });
                    const selectedUser = onSelected.indexOf(name) !== -1;
                    return (
                      <TableRow
                        hover
                        key={job_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell scope="row">
                          <Stack alignItems="center" direction="row" spacing={2}>
                            {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                            <Typography variant="subtitle2">{job_id}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{driverName}</TableCell>
                        <TableCell align="left">{assign_status}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{job_location}</TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, job_id,customer)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                        {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
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
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
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
                </>
              )}
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  handleClick: PropTypes.func,
  onSelected: PropTypes.array,
  handleOpenMenu: PropTypes.func
};

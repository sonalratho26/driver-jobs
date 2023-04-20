import PropTypes from 'prop-types';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, IconButton, Typography, styled,Tooltip } from '@mui/material';
import Iconify from '../../components/iconify';


const DriverSearch = (props) => {
const { numSelected, filterName, onFilterName } = props
  return(

 
<Card sx={{ p: 2,display: 'flex',
  justifyContent: 'space-between' }}>
    {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
    <OutlinedInput
    value={filterName}
    onChange={onFilterName}
      fullWidth
      placeholder="Search driver"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />  )}
     {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
  </Card>
  )
      }

DriverSearch.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DriverSearch;

DriverSearch.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
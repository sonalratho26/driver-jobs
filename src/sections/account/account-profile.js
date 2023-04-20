import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = () => {
const userData = JSON.parse(localStorage.getItem("loginDetails"));

return(
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
           src={"data:image/png;base64," + userData?.image_src}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {userData?.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userData?.role_id === 1 ? "Driver" : "Admin"} 
        </Typography>
        {/* <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.timezone}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
)
  
  };

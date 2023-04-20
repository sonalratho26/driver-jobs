import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { userRole } from 'src/constants/userRoles';
import {PencilSquareIcon, PlusCircleIcon} from "@heroicons/react/24/solid"


export const items = [
  {
    title: 'Reports',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN,userRole.DRIVER]
  },
  {
    title: 'Jobs',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN,userRole.DRIVER],
    childrens: [
       {
    title: 'All Jobs',
    path: '/jobs',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN,userRole.DRIVER]
  },
  {
    title: 'Add Jobs',
    path: '/addJobs',
    icon: (
      <SvgIcon fontSize="small">
       <PlusCircleIcon/>
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN]
  },
  ]  },
{
    title: 'Drivers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN],
    childrens: [
      {
   title: 'All Drivers',
   path: '/drivers',
   icon: (
     <SvgIcon fontSize="small">
       <ShoppingBagIcon />
     </SvgIcon>
   ),
   userAllowed:[userRole.ADMIN,userRole.DRIVER]
 },
 {
   title: 'Create Driver',
   path: '/createDriver',
   icon: (
     <SvgIcon fontSize="small">
       <UserPlusIcon />
     </SvgIcon>
   ),
   userAllowed:[userRole.ADMIN,userRole.DRIVER]
 },
 ] 
  } ,
  // {
  //   title: 'Companies',
  //   path: '/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
    userAllowed:[userRole.ADMIN,userRole.DRIVER]
  },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  //   userAllowed:[userRole.ADMIN,userRole.DRIVER]
  // },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];

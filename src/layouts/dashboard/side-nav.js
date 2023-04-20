import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";

import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import { SideNavSubItem } from "./side-nav-sub-item";
import { useSelector } from "react-redux";

export const SideNav = (props) => {
  const { open, onClose,isAuthenticated } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
   const menuButton = JSON.parse(localStorage.getItem("toggle"))
  const [openToggle, setOpen] = useState(false);
  const [isSubMenuShow, setIsSubMenuShow] = useState("");
  const LoginData  = useSelector((state) => state?.user?.data) 

  const roleId= LoginData?.role_id ? LoginData?.role_id :  isAuthenticated


  const newArray = items.filter((item) => item.userAllowed.includes(roleId))
    .map((item) => {
      return item;
    });

    useEffect(() => {
  
    }, [newArray])
    

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Driver Jobs
              </Typography>
              {/* <Typography
                color="neutral.400"
                variant="body2"
              >
                Production
              </Typography> */}
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {/* <div className="sidebar"> */}
            {newArray.map((item) => {
              let active = item.path ? pathname === item.path : false;
              if (item.childrens) {
                return (
                  <div className={menuButton || isSubMenuShow === item.title  ? "sidebar-item open" : "sidebar-item"}>
                    <div style={{ display: "flex" }}>
                      {item.icon && (
                        <Box
                          component="span"
                          sx={{
                            alignItems: "center",
                            color: "neutral.400",
                            display: "inline-flex",
                            justifyContent: "center",
                            mr: 2,
                            ...(active && {
                              color: "primary.main",
                            }),
                          }}
                        >
                          {item.icon}
                        </Box>
                      )}
                      <Box
                        component="span"
                        sx={{
                          color: "neutral.400",
                          flexGrow: 1,
                          fontFamily: (theme) => theme.typography.fontFamily,
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: "24px",
                          whiteSpace: "nowrap",
                          ...(active && {
                            color: "common.white",
                          }),
                          ...(item.disabled && {
                            color: "neutral.500",
                          }),
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.title}
                        {isSubMenuShow === item.title ? (
                          <KeyboardArrowDownIcon
                            onClick={() => {setOpen(!openToggle); setIsSubMenuShow(isSubMenuShow !== item.title ? item.title : null); localStorage.setItem("toggle",false)}}
                          ></KeyboardArrowDownIcon>
                        ) : (
                          <KeyboardControlKeyIcon
                            onClick={() => {setOpen(!openToggle); setIsSubMenuShow(isSubMenuShow !== item.title ? item.title : null); localStorage.setItem("toggle",true)}}
                          ></KeyboardControlKeyIcon>
                        )}
                      </Box>
                    </div>
                    <div className="sidebar-content">
                  
 
                      { isSubMenuShow === item.title && item.childrens.filter((item) => item.userAllowed.includes(roleId)).map((child, index) => {
                        active = child.path ? pathname === child.path : false;
                        return (
                          <SideNavSubItem
                            key={index}
                            active={active}
                            disabled={child.disabled}
                            external={child.external}
                            icon={child.icon}
                            path={child.path}
                            title={child.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <div>
                   <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              
                </div>
             
              );
            })}
            {/* </div> */}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

import { useContext, useEffect } from 'react'
import { MdMenu } from "react-icons/md";
import { BsCloudMoon, BsCloudSun } from "react-icons/bs";
import { InputBase, Tooltip, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  selectUser } from '../../../redux/features/userSlice';
import { ToastContainer } from 'react-toastify'
import { Box, IconButton } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsCircle } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdOutlineNotifications } from "react-icons/md";
import { ColorModeContext, tokens } from "../../../theme";
import './Navbar.css'


export default function Navbar({ sidebarToggle }) {

  const CurrentUser = useSelector(selectUser);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getUserCurrentData());
  //   }
  // }, [dispatch])


  return (
    <>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" p={2}>
        <div className='MenuBtnNav'>
          <Tooltip title="Open Menu">
            <IconButton onClick={() => sidebarToggle()}>
              <MdMenu />
            </IconButton>
          </Tooltip>
        </div>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <IoIosSearch />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          {theme.palette.mode === "dark" ? (
            <Tooltip title="Light">
              <IconButton
                onClick={colorMode.toggleColorMode}
              >
                <BsCloudSun />
              </IconButton>
            </Tooltip>

          ) : (
            <Tooltip title="Dark">
              <IconButton
                onClick={colorMode.toggleColorMode}
              >
                <BsCloudMoon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Notification">
            <IconButton>
              <MdOutlineNotifications />
            </IconButton>
          </Tooltip>
          <Tooltip title="Setting">
            <IconButton>
              <CiSettings />
            </IconButton>
          </Tooltip>

        </Box>
      </Box>

    </>
  )
}

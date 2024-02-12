import { useContext, useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MdOutlineMenu } from "react-icons/md";
import { BsCloudMoon, BsCloudSun } from "react-icons/bs";
import { Avatar, InputBase, Tooltip, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCurrentData, selectUser } from '../../../redux/features/userSlice';
import { ToastContainer } from 'react-toastify'
import { Box, IconButton } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsCircle } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FaUser } from 'react-icons/fa6';
import { ColorModeContext, tokens } from "../../../theme";


export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const CurrentUser = useSelector(selectUser);
  const tokenn = localStorage.getItem("token");
  const dispatch = useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    if (tokenn) {
      dispatch(getUserCurrentData());
    }
  }, [dispatch])


  return (
    <>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" p={2}>
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
          <IconButton
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <BsCloudSun />
            ) : (
              <BsCloudMoon />

            )}
          </IconButton>
          <IconButton>
            <IoNotificationsCircle />
          </IconButton>
          <IconButton>
            <CiSettings />
          </IconButton>
          <IconButton>
            <FaUser />
          </IconButton>
        </Box>
      </Box>

    </>
  )
}

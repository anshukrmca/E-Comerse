import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, useTheme } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { tokens } from "../../../theme";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await axios.post("/api/auth/signin", userData);
      const data = response.data;
      toast.success(data.message)
      localStorage.setItem("token", data.Jwt);
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error(error);
      // Handle other errors or network issues
    }
  };
  const labelColorStyle = {
    color: colors.grey[300], // Replace 'green' with your desired label color
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-black">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p className="text-center text-3xl font-bold underline animate-bounce dark:text-indigo-600 text-indigo-900 hover:text-lime-500">
              Login
            </p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              type="email"
              variant="standard"
              autoComplete="given email"
              // InputProps={{
              //   style: textColorStyle,
              // }}
              InputLabelProps={{
                style: labelColorStyle,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              autoComplete="off"
              InputLabelProps={{
                style: labelColorStyle,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="w-full"
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                padding: ".4rem 0",
                bgcolor: "#9155FD",
                "&:hover": {
                  bgcolor: "#9175FD",
                },
              }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="mt-2">
        <p className="font-thin text-sm">
          Need a Account ?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="text-indigo-600 font-bold cursor-pointer"
          >
            New
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      const data = JSON.stringify(response.data.user);
     localStorage.setItem("user", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
      if (data.isAdmin === "true") {
        navigate("/dashboard");
        localStorage.setItem("token", data.Jwt);
        await fetchData();
      } else {
        navigate("/login");
        localStorage.setItem("token", data.Jwt);
        await fetchData();
      }
      window.location.reload();
     
    } catch (error) {
      console.error(error);
      // Handle other errors or network issues
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

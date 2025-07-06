import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "19px auto",
    backgroundColor: "#E6F4F1",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnstyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (event: any) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Enter the username or password correctly!");
      return;
    }
    setError("");
    try {
      const response = await axios.post("locahost:4000/auth/signup", {
        username,
        password,
      });
      console.log("sign up successful", response.data);
    } catch (err) {
      console.error("Sign up error!", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Grid>
      <Paper elevation={12} style={paperStyle}>
        <form onSubmit={handleSignup}>
          <Grid container justifyContent="center" alignItems="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon style={{ color: "#002A57" }} />
            </Avatar>
            <h2>Sign up</h2>
          </Grid>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            placeholder="Enter Your Username"
            fullWidth
            required
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            required
          />

          <Button
            style={btnstyle}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default signup;

import { useState, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const API_URL: string = process.env.REACT_APP_API_URL!;
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

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Fill the field");
      return;
    }
    setError("");

    try {
      const res = await axios.post<{ token: string }>(`${API_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        navigate("/chat");
      }
    } catch (err) {
      console.log("Login error!", err);
      setError("Login failed. Please try again");
    }
  };

  return (
    <Grid>
      <Paper elevation={12} style={paperStyle}>
        <form onSubmit={handleLogin}>
          <Grid container justifyContent="center" alignItems="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon style={{ color: "#002A57" }} />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            placeholder="Enter Your Username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            style={btnstyle}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login
          </Button>

          <Typography>
            Don't have an account?
            <Link href="/signup">Sign Up Here.</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;

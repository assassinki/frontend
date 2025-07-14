import { useState, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
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

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordStrong = (password: string) => password.length >= 8;

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPasswordStrong(password)) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Invalid email address");
      return;
    }
    if (!username || !password || !email) {
      setError("Enter the username, password or email correctly!");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        navigate("/login");
      }
      console.log("sign up successful", response.data);
    } catch (err) {
      console.error("Sign up error!", err);
      setError("SignUp failed. Please try again.");
    }
  };

  return (
    <Grid>
      <Paper elevation={12} style={paperStyle}>
        <form onSubmit={handleSignUp}>
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
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Typography>
            <Link href="/login">Login Here.</Link>
          </Typography>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;

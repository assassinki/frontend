import React from "react";
import "./App.css";
import Signin from "./view/signin";
import Signup from "./view/signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import Chatting from "./componets/Chat";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};
const MainLayout: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname !== "/";

  return (
    <>
      {!hideNav && (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome
            </Typography>
            <Box>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{ textTransform: "none", mr: 2 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/signup"
                sx={{ textTransform: "none" }}
              >
                Signup
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </>
  );
};

export default App;

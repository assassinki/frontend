import React from "react";
import "./App.css";
import Signin from "./view/signin";
import Signup from "./view/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

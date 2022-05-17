import React, { useState } from "react";
import "./Form.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Form = (props) => {
  const Navigate = useNavigate();
  const [form, setform] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setform({
      ...form,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    if (form.Password !== form.ConfirmPassword) {
      alert("Password does not match");
    }
    // if (!document.getElementsByClassName("inputfield")[0].checkValidity()) {
    //   document.getElementsByClassName("inputfield")[0].reportValidity();
    //   return;
    // }
    axios
      .post("http://localhost:80/registeruser", form)
      .then((res) => {
        Navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };
  return (
    <>
      <Typography> Your Taskboard App </Typography>
      <div className="inputfield">
        <Box
          sx={{
            width: 400,
            maxWidth: "80%",
            margin: "auto",
          }}
        >
          <h1>
            <center>Sign Up</center>
          </h1>
          <TextField
            fullWidth
            label="Username"
            value={form.Name}
            onChange={inputHandler}
            variant="filled"
            name="Name"
            placeholder="Choose a username"
          />
          <TextField
            fullWidth
            autoComplete="off"
            label="Email"
            value={form.Email}
            onChange={inputHandler}
            variant="filled"
            name="Email"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={form.Password}
            onChange={inputHandler}
            variant="filled"
            name="Password"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={form.ConfirmPassword}
            onChange={inputHandler}
            variant="filled"
            name="ConfirmPassword"
          />
          <Button variant="outlined" onClick={submitHandler} id="btn">
            Register
          </Button>
          <Button
            variant="outlined"
            onClick={() => Navigate("/login")}
            id="btn"
          >
            Login
          </Button>
        </Box>
      </div>
    </>
  );
};
export default Form;

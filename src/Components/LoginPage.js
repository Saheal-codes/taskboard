import React, { useState } from "react";
import "./Form.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const Navigate = useNavigate();
  const [form, setform] = useState({
    Email: "",
    Password: "",
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
    if (
      !document.getElementsByClassName("inputfieldlogin")[0].checkValidity()
    ) {
      document.getElementsByClassName("inputfieldlogin")[0].reportValidity();
      return;
    }
    axios
      .post("http://localhost:80/loginuser", form)
      .then((res) => {
        props.setauth(true);
        props.setuser(res.data.data);
        localStorage.setItem("token", res.data.accesstoken);
        Navigate("/taskpage");
      })
      .catch((err) => {
        alert(
          err.response.data.message || "Something went wrong. Please try again"
        );
      });
  };
  return (
    <>
      <form className="inputfieldlogin">
        <Box
          sx={{
            width: 400,
            maxWidth: "80%",
            margin: "auto",
          }}
        >
          <h1>
            <center>Log In</center>
          </h1>
          <TextField
            required
            fullWidth
            label="Email"
            value={form.Email}
            onChange={inputHandler}
            variant="filled"
            name="Email"
          />
          <TextField
            required
            fullWidth
            label="Password"
            value={form.Password}
            onChange={inputHandler}
            variant="filled"
            name="Password"
            type="password"
          />

          <Button variant="outlined" onClick={submitHandler} id="btn">
            LOGIN
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Login;

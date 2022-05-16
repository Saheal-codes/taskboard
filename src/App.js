import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/SignupPage";
import Login from "./Components/LoginPage";
import TaskPage from "./Components/TaskPage";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";

const App = () => {
  const [auth, setauth] = useState(false);
  const [user, setuser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:80/verifytoken", { token })
        .then((res) => {
          setauth(true);
          setuser(res.data.user);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, []);

  let routes;

  if (!auth) {
    routes = (
      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/login"
          element={<Login setauth={setauth} setuser={setuser} />}
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/taskpage" element={<TaskPage />} />
      </Routes>
    );
  }
  return (
    <>
      <Router>{routes}</Router>
    </>
  );
};
export default App;

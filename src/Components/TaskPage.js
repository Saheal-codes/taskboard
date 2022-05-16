import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import MainHeader from "./MainHeader";
import axios from "axios";
import "./TaskPage.css";

const TaskPage = (props) => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    task: "",
  });
  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, form]);
    setForm({
      task: "",
    });
  };
  const deleteHandler = (index) => {
    setTasks(tasks.filter((task, num) => num !== index));
  };
  const [pic, setpic] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let num = Math.floor(Math.random() * 100);
        console.log(num);
        let picture = await axios.get(`https://picsum.photos/id/${num}/info`);
        console.log(picture);
        setpic(picture.data.download_url);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <MainHeader>
        <img className="picture" src={pic}></img>
      </MainHeader>
      <div>
        <Box
          sx={{
            width: 400,
            maxWidth: "80%",
            margin: "auto",
          }}
        >
          <h1>Task Page</h1>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              required
              label="Add Task"
              type="text"
              name="task"
              id="task"
              onChange={inputHandler}
              value={form.task}
              style={{ "margin-bottom": "10px" }}
            />
            <Button
              type="submit"
              variant="outlined"
              style={{ align: "center", "margin-bottom": "10px" }}
            >
              Add Task
            </Button>
          </form>
          <div className="container">
            <div className="card">
              <span className="card-checkbox card-addtask">+</span>
              Add a Task
            </div>
            {tasks.length ? (
              tasks.map((task, index) => (
                <div key={index} className="card">
                  <span className="card-checkbox"></span>
                  {task.task}
                  <Button
                    onClick={() => deleteHandler(index)}
                    variant="contained"
                    style={{ "margin-left": "auto" }}
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <h1>No tasks yet! Add some!</h1>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};
export default TaskPage;

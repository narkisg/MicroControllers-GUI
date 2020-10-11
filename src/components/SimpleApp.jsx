import React, { useEffect } from "react";
import useTodoState from "../hooks/useTodoState";
import FirstButton from "./FirstButton";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import * as io from "socket.io-client";

function SimpleApp() {
  const initialTodos = JSON.parse(window.localStorage.getItem("todos") || "[]");
  const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoState(
    initialTodos
  );
  var socket;
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  socket = io("http://localhost:5000");
  socket.on("list", (list) => {
    console.log(list);
    alert(list["controllers"]);
  });

  const clickHandler = () => {
    socket.emit("getlist", { message: "the test worked :)" });
  };

  const clickExitHandler = () => {
    socket.emit("exit");
  };

  const clickListPortsHandler = () => {
    socket.emit("list_of_ports");
  };
  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: "100vh",
        backgroundColor: "#fafafa",
      }}
      elevation={0}>
      <AppBar color="primary" position="static" style={{ height: "64px" }}>
        <Toolbar>
          <Typography color="inherit">Adi and Nevo</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" style={{ marginTop: "1rem" }}>
        <Grid item xs={11} md={8} lg={4}>
          <FirstButton></FirstButton>
          <button onClick={clickHandler}>test socket</button>
          <button onClick={clickExitHandler}>Exit</button>
          <button onClick={clickListPortsHandler}>List Ports</button>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default SimpleApp;

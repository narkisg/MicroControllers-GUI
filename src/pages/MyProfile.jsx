import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
// eslint-disable-next-line no-unused-vars
import NavBar from "../components/NavBar";
import * as io from "socket.io-client";
var socket;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
  const classes = useStyles();
  const [stateUsername, setstateUsername] = useState("Nevo Strauss");
  const [statePassword, setstatePassword] = useState("071093");
  const [stateAuth, setstateAuth] = useState("CEO");
  const rows = [
    createData("Username", `${stateUsername}`),
    createData("Password", `${statePassword}`),
    createData("Authorization", `${stateAuth}`),
  ];
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("my_profile_response", (reply) => {
      var object = JSON.parse(reply);
      setstateUsername(object.username);
      setstatePassword(object.password);
      if (object.authorization === "1") {
        setstateAuth("simple user");
      } else if (object.authorization === "2") {
        setstateAuth("developer");
      } else if (object.authorization === "3") {
        setstateAuth("administrator");
      }
    });
    socket.emit("my_profile");
    return () => {
      socket.off("my_profile_response");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="md">
        <br />
        <h1>My Profile</h1>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auto from "../components/Auto";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";

import * as io from "socket.io-client";
var socket;
socket = io("http://localhost:5000");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const optionsController = ["optionsController 1", "optionsCommand 2"];
export default function EditUser() {
  const classes = useStyles();
  const [usermsg, setusermsg] = useState("");

  const [state, setState] = useState({ username: "", password: "" });
  const [age, setAge] = React.useState("");
  const [newUserName, setNewUserName] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [userValue, setUserValue] = useState("");
  const [stateUsersList, setstateUsersList] = useState(["adi"]);

  socket.on("list_of_users_response", (reply) => {
    var list = JSON.parse(reply);
    setstateUsersList(list);
  });

  useEffect(() => {
    // Run! Like go get some data from an API.
    socket.emit("get_list_of_users", () => {
      // moving to a difrent page:
    });
  }, []);

  socket.on("change_authorization_response", (reply) => {
    if (reply.success === "true") {
      setusermsg(reply.message);
    } else {
      setusermsg(reply.message);
    }
  });

  socket.on("change_password_response", (reply) => {
    if (reply.success === "true") {
      setusermsg(reply.message);
    } else {
      setusermsg(reply.message);
    }
  });

  socket.on("change_username_response", (reply) => {
    if (reply.success === "true") {
      setusermsg(reply.message);
    } else {
      setusermsg(reply.message);
    }
  });
  const onSubmitFunc = (e) => {
    e.preventDefault();
    // if no user name:
    if (!userValue) {
      setusermsg("empty field");
    } else {
      // if username:
      if (age) {
        // if there is auto code:
        socket.emit("change_user_authorization", {
          username: userValue,
          new_authorization: age.toString(),
        });
      }
      if (newPassword) {
        // if there is new name:
        socket.emit("change_password", {
          username: userValue,
          new_password: newPassword.toString(),
        });
      }
      if (newUserName) {
        // if there is new name:
        socket.emit("change_user_name", {
          // chane from:
          username: userValue,
          // change to:
          new_username: newUserName,
        });
      }
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <form onSubmit={onSubmitFunc} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  value={userValue}
                  fullWidth
                  onChange={(event, newValue) => {
                    setUserValue(newValue);
                  }}
                  id="user"
                  options={stateUsersList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Users List"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="new username (optional)"
                  name="email"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="new password (optional)"
                  name="email"
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    user authorization
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="user
                    authorization">
                    <MenuItem value={1}>simple user</MenuItem>
                    <MenuItem value={2}>developer</MenuItem>
                    <MenuItem value={3}>administrator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <h5>{usermsg}</h5>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Edit User Details
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

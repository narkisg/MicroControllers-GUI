import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as io from "socket.io-client";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
var socket;

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

export default function NewUser() {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [authcode, setauthcode] = useState("");
  const [usermsg, setusermsg] = useState("");

  // socket io:
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("login_response", (reply) => {
      if (reply.success === "true") {
        // moving to a difrent page:
        alert(reply.message);
        // then:
        // history.push("/");
      } else {
        alert(reply.message);
      }
    });
    socket.on("register_response", (reply) => {
      if (reply.success === "true") {
        setusermsg(reply.message);
      } else {
        setusermsg(reply.message);
      }
    });

    return () => {
      socket.off("login_response");
      socket.off("register_response");
      socket.disconnect();
    };
  }, []);

  const onInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleChange = (event) => {
    setauthcode(event.target.value);
  };
  const onSubmitFunc = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = state;
    if (password !== passwordConfirm) {
      setusermsg("password error");
    } else if (!username || !password || !passwordConfirm || !authcode) {
      setusermsg("missing field");
    } else {
      socket.emit("register_user", {
        new_user_name: username,
        new_password: password,
        new_authorization_code: authcode,
      });
    }
  };

  return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <h1>Create user</h1>
            <br />
            <form onSubmit={onSubmitFunc} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="New User Name"
                      name="username"
                      id="username"
                      onChange={(e) => onInputChange(e)}
                      value={state.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="New Password"
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => onInputChange(e)}
                      value={state.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      name="passwordConfirm"
                      id="passwordConfirm"
                      onChange={(e) => onInputChange(e)}
                      value={state.passwordConfirm}
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <FormControl
                      fullWidth
                      variant="outlined"
                      className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      new user authorization (optional)
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={authcode}
                        onChange={handleChange}
                        label="new user
                    authorization (optional)">
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
                Create New User
              </Button>
            </form>
          </div>
        </Container>
      </div>
  );
}

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as io from "socket.io-client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

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


export default function DeleteUser() {
  const classes = useStyles();
  const [usermsg, setusermsg] = useState("");

  const [value, setValue] = useState("");
  const [stateUsersList, setstateUsersList] = useState([""]);
  const [open, setOpen] = React.useState(false);

  // socket io:
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("list_of_users_response", (reply) => {
      var list = JSON.parse(reply);
      setstateUsersList(list);
    });

    socket.on("delete_user_response", (reply) => {
      if (reply.success === "true") {
        // moving to a difrent page:
        setusermsg(reply.message);
        // then:
      } else {
        setusermsg(reply.message);
      }
    });
    return () => {
      socket.off("list_of_users_response");
      socket.off("delete_user_response");
      socket.disconnect();
    }
  }, []);


  useEffect(() => {
    // Run! Like go get some data from an API.
    socket.emit("get_list_of_users", () => {
      // moving to a difrent page:
    });
  }, []);


  const onSubmitFunc = (e) => {
    e.preventDefault();
    // alert(value);
    socket.emit("delete_user", {
      username_to_delete: value,
    });
  };


  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (e) => {
    onSubmitFunc(e)
    setOpen(false);
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <h1>
            Delete user
          </h1>
          <form onSubmit={handleClickOpen} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  value={value}
                  fullWidth
                  onChange={(event, newValue) => {
                    setValue(newValue);
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
            </Grid>
            <h5>{usermsg}</h5>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Delete User
            </Button>
          </form>
        </div>
      </Container>
      <div>
        <Dialog
            open={open}
            onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Delete user alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleProceed} color="primary" autoFocus>
              Delete anyway
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

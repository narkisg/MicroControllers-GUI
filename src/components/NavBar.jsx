// eslint-disable-next-line no-unused-vars
import { Box, Typography, Button, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import * as io from "socket.io-client";
var socket;


const NavBar = (props) => {
  const [userAuth, setuserAuth] = useState(3);
  const { history } = props;

  // socket io:
  useEffect(() => {
    socket = io("http://localhost:5000");
    return () => socket.disconnect()
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    socket.emit("logout_attempt");
    history.push("/SignInPage");
  };
  useEffect(() => {
    socket.on("my_profile_response", (reply) => {
      var object = JSON.parse(reply);
      var newobj = parseInt(object.authorization);
      setuserAuth(newobj);
    });
    socket.emit("my_profile");
  }, []);

  const itemsList = [
    {
      text: "Update Program",
      auth: [1, 2, 3],
      onClick: () => history.push("/"),
    },
    {
      text: "User Management",
      auth: [3],
      onClick: () => history.push("/UserManagement"),
    },
    {
      text: "My Profile",
      auth: [1, 2, 3],
      onClick: () => history.push("/MyProfile"),
    },
    {
      text: "Settings",
      auth: [1, 2, 3],
      onClick: () => history.push("/Settings"),
    },
  ];

  return (
    <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
      <img src="netafim-logo.png" alt="logo" height="40"/>
      <Box>
        {itemsList
          .filter((user) => user.auth.includes(userAuth))
          .map((item, index) => {
            const { text, userauthi, onClick } = item;
            return (
              <Button color="primary" onClick={onClick} key={index}>
                {text}
              </Button>
            );
          })}
      </Box>
      <Box flexGrow={1} textAlign="right">
        <Button
          onClick={onLogout}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default withRouter(NavBar);

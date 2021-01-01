
import React, {useState, useEffect, useContext} from "react";
import { Box, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {UnitTestContext} from "./UnitTestContext";

import * as io from "socket.io-client";
var socket;


const NavBar = (props) => {
  const [userAuth, setuserAuth] = useState(3);
  const { history } = props
  const UnitTestProps = useContext(UnitTestContext)

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

  const onSwitch = (e) => {
    e.preventDefault();
    const prevValue = UnitTestProps.switchStatus
    console.log({prevValue})
    UnitTestProps.setSwitchStatus(!prevValue)
    history.push("/UpdateProgram");  // go to update program page (push 'this')
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
      onClick: () => history.push("/UpdateProgram"),
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
      text: "Status Settings",
      auth: [1, 2, 3],
      onClick: () => history.push("/StatusSettings"),
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
      <Box flexGrow={100} textAlign="right">
        <Button
            onClick={onSwitch}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AutorenewIcon />}>
          Unit Test
        </Button>
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

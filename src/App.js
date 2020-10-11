import React, { useEffect } from "react";
import "./styles.css";
import UpdateProgram from "./pages/UpdateProgram";
import SignInPage from "./pages/SignInPage";
import UserManagement from "./pages/UserManagement";
import MyProfile from "./pages/MyProfile";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Theme from "./Theme";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import * as io from "socket.io-client";
var socket;
socket = io("http://localhost:5000");

export default function App() {
  const history = useHistory();
  useEffect(() => {
    socket.on("is_connected_response", (reply) => {
      if (reply.success === "false") {
        history.push("/SignInPage");
      }
    });
    socket.emit("is_connected");
  }, []);
  return (
    <Theme>
      <div>
        <div>
          <Switch>
            <Route
              exact
              from="/"
              render={(props) => <UpdateProgram {...props} />}
            />

            <Route
              exact
              path="/UserManagement"
              render={(props) => <UserManagement {...props} />}
            />
            <Route
              exact
              path="/MyProfile"
              render={(props) => <MyProfile {...props} />}
            />
            <Route
              exact
              path="/SignInPage"
              render={(props) => <SignInPage {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Theme>
  );
}

import React, { useEffect  } from "react";
import "./styles.css";
import UpdateProgram from "./pages/UpdateProgram";
import SignInPage from "./pages/SignInPage";
import UserManagement from "./pages/UserManagement";
import MyProfile from "./pages/MyProfile";
import { Route, Switch } from "react-router-dom";
import Theme from "./Theme";
import { useHistory } from "react-router-dom";
import Splash from "./pages/splash";
var socket;


export default function App() {
  const history = useHistory();

  history.push("/Splash");

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
                from="/Splash"
                render={(props) => <Splash {...props} />}
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

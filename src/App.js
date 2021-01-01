import React, {useState} from "react";
import "./styles.css";
import UpdateProgram from "./pages/UpdateProgram";
import SignInPage from "./pages/SignInPage";
import UserManagement from "./pages/UserManagement";
import MyProfile from "./pages/MyProfile";
import { Route, Switch } from "react-router-dom";
import Theme from "./Theme";
import { useHistory } from "react-router-dom";
import Splash from "./pages/splash";
import StatusSetting from "./pages/StatusSettings";
import {UnitTestContext} from "./components/UnitTestContext";

export default function App() {

  const history = useHistory();
  history.push("/Splash");

  const [switchStatus, setSwitchStatus] = useState(true)
  const makeSwitch = {
    switchStatus:switchStatus,
    setSwitchStatus:setSwitchStatus
  }

  return (
      <UnitTestContext.Provider value={makeSwitch}>
      <Theme >
        <div>
          <div>
            <Switch>
              <Route
                  exact
                  from="/"
                  render={(props) =>
                        <UpdateProgram {...props} />}
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
                  path="/StatusSettings"
                  render={(props) =>
                    <StatusSetting {...props} />}
              />
              <Route
                  exact
                  from="/Splash"
                  render={(props) => <Splash {...props} />}
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
      </UnitTestContext.Provider>
  );
}

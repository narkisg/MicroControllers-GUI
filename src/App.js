import React from "react";
import "./styles.css";
import SignInPage from "./pages/SignInPage";
import { Route, Switch } from "react-router-dom";
import Theme from "./Theme";
import { useHistory } from "react-router-dom";
import Splash from "./pages/splash";
import WrapingContext from "./pages/WrapingContext"
export default function App() {

  const history = useHistory();
  history.push("/Splash");

  return (
      <Theme >
        <div>
          <div>
            <Switch>
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
              <WrapingContext/>
            </Switch>
          </div>
        </div>
      </Theme>
  );
}

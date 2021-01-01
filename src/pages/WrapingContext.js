import React, {useState} from "react";
import UpdateProgram from "./UpdateProgram";
import UserManagement from "./UserManagement";
import { Route, Switch } from "react-router-dom";
import StatusSetting from "./StatusSettings";
import MyProfile from "./MyProfile";
import {UnitTestContext} from "../components/UnitTestContext";

export default function WrapingContext() {
    const [switchStatus, setSwitchStatus] = useState(true)
    const makeSwitch = {
        switchStatus:switchStatus,
        setSwitchStatus:setSwitchStatus
    }

    return (
        <div>
            <UnitTestContext.Provider value={makeSwitch}>
                <Switch>
                    <Route
                        exact
                        path="/UserManagement"
                        render={(props) => <UserManagement {...props} />}
                    />
                    <Route
                        exact
                        from="/UpdateProgram"
                        render={(props) =>
                            <UpdateProgram {...props} />}
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
                </Switch>
            </UnitTestContext.Provider>
        </div>
    )
}




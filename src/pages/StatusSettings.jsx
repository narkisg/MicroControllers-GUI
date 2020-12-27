import React, { useState} from "react";
import NavBar from "../components/NavBar";
import Theme from "../Theme";
import Button from "@material-ui/core/Button";
import DisplayAllPorts from "../components/DisplayAllPorts";
import DisplaySpecifiedPorts from "../components/DisplaySpecifiedPort";


const StatusSetting = () => {
    const [openAllPorts, setOpenAllPorts] = useState(false);
    const handleClickOpenAllPorts = () => {
        setOpenAllPorts(true);
    };
    const handleCloseAllPorts = () => {
        setOpenAllPorts(false);
    };

    const [openByPort, setOpenByPort] = useState(false);
    const handleClickOpenByPort = () => {
        setOpenByPort(true);
    };
    const handleCloseByPort = () => {
        setOpenByPort(false);
    };

    return (
        <Theme>
            <NavBar />
            <div style={{display: "flex"}}>
                <Button variant="outlined" color="primary" onClick={handleClickOpenAllPorts}>
                    Discover All Ports Configuration
                </Button>
                <DisplayAllPorts  open={openAllPorts} onClose={handleCloseAllPorts} />
                <Button variant="outlined" color="primary" onClick={handleClickOpenByPort}>
                    Discover Port Configuration
                </Button>
            </div>
            <DisplaySpecifiedPorts  open={openByPort} onClose={handleCloseByPort} />
        </Theme>
    );
};

export default StatusSetting;


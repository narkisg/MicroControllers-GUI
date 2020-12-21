import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";


function DisplaySpecifiedPorts(props){
    const [stateControllers, setstateControllers] = useState([""]);
    const [stateControllersV, setstateControllersV] = useState("");
    const { onClose, open } = props;
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">
                <Autocomplete
                    value={stateControllersV}
                    fullWidth
                    onChange={(event, newValue) => {
                        setstateControllersV(newValue);
                    }}
                    id="controllers"
                    options={stateControllers}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="controllers"
                            variant="outlined"
                        />
                    )}
                />
                <br />
            </DialogTitle>
        </Dialog>

    )
}

export default DisplaySpecifiedPorts;
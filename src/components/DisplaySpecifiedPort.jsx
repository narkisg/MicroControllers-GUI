import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PortControllersMap from "./PortControllersMap";

import * as io from "socket.io-client";
let socket;

function DisplaySpecifiedPorts(props){

    const [stateCommandsPortsV, setstateCommandsPortsV] = useState("");
    const [stateCommandsPorts, setstateCommandsPorts] = useState([""]);

    const [toDisplayButton, settoDisplayButton] = useState(false)
    const [toDisplayDropdown, settoDisplayDropdown] = useState(true)

    const { onClose, open } = props;
    const handleClose = () => {
        onClose();
        settoDisplayButton(false)
        settoDisplayDropdown(true)
    };

    const renderControllersMap = () => {
        settoDisplayButton(true)
        settoDisplayDropdown(false)
    }

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    useEffect(() => {
        socket = io("http://localhost:5000");
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        socket.emit("get_list_of_ports", () => {});
    }, []);

    useEffect(() => {
        socket.on("list_of_ports_response", (reply) => {
            if (reply) {
                const contList = JSON.parse(reply);
                setstateCommandsPorts(contList);
            }
        });
        return () => socket.off("list_of_ports_response");
    }, []);


    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Controllers Mapping By Port
                </DialogTitle>
                {toDisplayDropdown?
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Choose Port and Press 'Discover' to see it's controllers mapping.
                        </Typography>
                    </DialogContent>:null}
                {toDisplayDropdown?
                    <DialogContent dividers>
                        <Autocomplete
                            value={stateCommandsPortsV}
                            fullWidth
                            onChange={(event, newValue) => {
                                setstateCommandsPortsV(newValue);
                            }}
                            id="ports"
                            options={stateCommandsPorts}
                            renderInput={(params) => (
                                <TextField {...params} label="ports" variant="outlined" />
                            )}
                        />
                    </DialogContent>:null}
                <DialogActions>
                    {toDisplayButton? <PortControllersMap port={stateCommandsPortsV}/>:
                        <Button autoFocus onClick={renderControllersMap} color="primary">
                            Discover
                        </Button>}
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DisplaySpecifiedPorts;


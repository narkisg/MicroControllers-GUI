import React from "react";
import NavBar from "../components/NavBar";
import Theme from "../Theme";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DisplayAllPorts from "../components/DisplayAllPorts";
import DisplaySpecifiedPorts from "../components/DisplaySpecifiedPort";


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
withStyles(styles)((props) => {
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
withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },

}))(MuiDialogActions);
const StatusSetting = () => {
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Theme>
        <NavBar />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Discover All Ports Configuration
            </Button>
            <DisplayAllPorts  open={open} onClose={handleClose} />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Discover Port Configuration
            </Button>
            <DisplaySpecifiedPorts  open={open} onClose={handleClose} />
            {/*<div>*/}
        {/*    <Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
        {/*        Open dialog*/}
        {/*    </Button>*/}
        {/*    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>*/}
        {/*        <DialogTitle id="customized-dialog-title" onClose={handleClose}>*/}
        {/*            Modal title*/}
        {/*        </DialogTitle>*/}
        {/*        <DialogContent dividers>*/}
        {/*            <Typography gutterBottom>*/}
        {/*                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis*/}
        {/*                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.*/}
        {/*            </Typography>*/}
        {/*            <Typography gutterBottom>*/}
        {/*                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis*/}
        {/*                lacus vel augue laoreet rutrum faucibus dolor auctor.*/}
        {/*            </Typography>*/}
        {/*            <Typography gutterBottom>*/}
        {/*                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel*/}
        {/*                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus*/}
        {/*                auctor fringilla.*/}
        {/*            </Typography>*/}
        {/*        </DialogContent>*/}
        {/*        <DialogActions>*/}
        {/*            <Button autoFocus onClick={handleClose} color="primary">*/}
        {/*                Save changes*/}
        {/*            </Button>*/}
        {/*        </DialogActions>*/}
        {/*    </Dialog>*/}
        {/*</div>*/}
    </Theme>
            );
};

export default StatusSetting;

// function handleClick1()
// {
//     alert("passed")
// }
// function handleClick2()
// {
//     alert("passed2")
// }
// <Theme>
//     <NavBar />
//     <Box flexGrow={1} textAlign="left" >
//         <Button
//             onClick={handleClick1}
//             variant="contained"
//             color="primary"
//             size="small"
//             startIcon={<CastConnectedIcon />}>
//             Discover All Controllers state
//         </Button>
//     </Box>
//     <Box flexGrow={1} textAlign="left"  >
//         <Button
//             onClick={handleClick2}
//             variant="contained"
//             color="primary"
//             size="small"
//             startIcon={<CastConnectedIcon />}>
//             Discover Controller state
//         </Button>
//     </Box>
// </Theme>
// );
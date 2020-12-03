import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as io from "socket.io-client";
import Commands from "../components/Commands";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card, CardContent, TextField } from "@material-ui/core";
import MsgCard from "../components/MsgCard";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var socket;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ensureCommands = ['BL_FLASH_MASS_ERASE','BL_FLASH_ERASE','BL_MEM_WRITE',
                            'BL_EN_R_W_PROTECT','BL_MEM_READ','BL_READ_SECTOR_P_STATUS',
                            'BL_OTP_READ','BL_DIS_R_W_PROTECT', 'BL_MY_NEW_COMMAND']

const UpdateProgram = () => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const [usermsg, setusermsg] = useState("");

  const [stateCommands, setstateCommands] = useState([""]);
  const [stateControllers, setstateControllers] = useState([""]);
  const [stateCommandsPorts, setstateCommandsPorts] = useState([""]);

  const [stateCommandsV, setstateCommandsV] = useState("");
  const [stateControllersV, setstateControllersV] = useState("");
  const [stateCommandsPortsV, setstateCommandsPortsV] = useState("");

  const [isSectorsNumbers, setisSectorsNumbers] = useState("");
  const [isNumberOfSectors, setisNumberOfSectors] = useState("");
  const [isFileName, setisFileName] = useState("");
  const [isTotalSector, setisTotalSector] = useState("");
  const [isListOfSector, setisListOfSector] = useState("");
  const [isMode, setisMode] = useState("");
  const listOfNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  const [listofNumbers2, setlistofNumbers2] = useState([""]);
  const [process, setprocess] = useState([""]);
  const [bootloader, setbootloader] = useState([""]);
  const [loading, setloading] = useState(false);
  const [finishcode, setfinishcode] = useState(false);
  const [portmsg, setportmsg] = useState("");

  // socket io:
  useEffect(() => {
    socket = io("http://localhost:5000");
    return () => socket.disconnect();
  }, []);

  // process:
  useEffect(() => {
    socket.on("execute_command_bootloader_response", (reply) => {
      if (reply) {
        setfinishcode(true);
        setloading(false);
        setbootloader(reply.message);
      } else {
        setfinishcode(true);
        setloading(false);
        setbootloader(reply.message);
      }
    });
    return () => socket.off("execute_command_bootloader_response");
  }, []);

  // bootloader:
  useEffect(() => {
    socket.on("execute_command_process_response", (reply) => {
      if (reply) {
        setfinishcode(true);
        setloading(false);
        setprocess(reply);
      } else {
        setfinishcode(true);
        setloading(false);
        setprocess(reply);
      }
    });
    return () => socket.off("execute_command_process_response");
  }, []);

  // portmsg:
  useEffect(() => {
    socket.on("port_configuration_response", (reply) => {
      if (reply) {
        setportmsg(reply.message);
      } else {
        setportmsg(reply.message);
      }
    });
    return () => socket.off("port_configuration_response");
  }, []);

  // other:
  useEffect(() => {
    socket.on("list_of_commands_response", (reply) => {
      if (reply) {
        const map1 = JSON.parse(reply);
        // alert(reply);
        const map2 = map1.map((x) => x.name);
        setstateCommands(map2);
      } else {
        setusermsg("error");
      }
    });
    return () => socket.off("list_of_commands_response");
  }, []);

  useEffect(() => {
    socket.on("list_of_controllers_response", (reply) => {
      if (reply) {
        const map1 = JSON.parse(reply);
        setstateControllers(map1);
      } else {
        setusermsg("error");
      }
    });
    return () => socket.off("list_of_controllers_response");
  }, []);
  useEffect(() => {
    socket.on("list_of_ports_response", (reply) => {
      if (reply) {
        const map1 = JSON.parse(reply);
        setstateCommandsPorts(map1);
      } else {
        setusermsg("error");
      }
    });
    return () => socket.off("list_of_ports_response");
  }, []);
  useEffect(() => {
    socket.on("execute_command_response", (reply) => {
      setloading(false);
      if (reply.success === "true") {
        setusermsg(reply.message);
      } else {
        setusermsg(reply.message);
      }
    });
    return () => socket.off("execute_command_response");
  }, []);

  useEffect(() => {
    socket.emit("get_list_of_commands", () => {});
  }, []);
  useEffect(() => {
    socket.emit("get_list_of_controllers", () => {});
  }, []);
  useEffect(() => {
    socket.emit("get_list_of_ports", () => {});
  }, []);
  const onSubmitFunc = (e) => {
    e.preventDefault();

    // if there is empty fields:

    if (!stateCommandsPortsV || !stateControllersV || !stateCommandsV) {
      setusermsg("empty field");
    } else {
      setfinishcode(true);
      if (stateCommandsV === "BL_GO_TO_ADDR") {
        setloading(true);
        socket.emit("execute_command", {
          port_name: stateCommandsPortsV,
          controller_name: stateControllersV,
          command_name: stateCommandsV,
          additional_parameters: { address: "0" },
        });
      } else if (stateCommandsV === "BL_FLASH_ERASE") {
        if (!isSectorsNumbers || !isNumberOfSectors) {
          setusermsg("empty field");
        } else {
          setloading(true);
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: {
              sector_number: isSectorsNumbers,
              number_of_sectors_to_erase: isNumberOfSectors,
            },
          });
        }
      } else if (stateCommandsV === "BL_MEM_WRITE") {
        // open dialog with title = "are you sure you want to..."
        // if no - return

        if (!isFileName) {
          setusermsg("empty field");
        } else {
          setloading(true);
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: {
              file_name: isFileName,
              address: "0",
            },
          });
        }
      } else if (stateCommandsV === "BL_EN_R_W_PROTECT") {
        if (!isTotalSector || !isListOfSector || !isMode) {
          setusermsg("empty field");
        } else if (isListOfSector.length > parseInt(isTotalSector)) {
          setusermsg("list length supposed to be as total sector  ");
        } else {
          setloading(true);
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: {
              total_sector: isTotalSector,
              list_of_sector_numbers: isListOfSector,
              mode: isMode,
            },
          });
        }
      } else {
        if (!stateCommandsPorts || !stateControllers || !stateCommandsV) {
          setusermsg("empty field");
        } else {
          setloading(true);
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            // port_name: "COM3",
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: {},
          });
        }
      }
    }
  };

  function areYouSure(e){
    if(ensureCommands.includes(stateCommandsV)){
      handleClickOpen(e)
    }
    else {
      onSubmitFunc(e)
    }
  }
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (e) => {
    onSubmitFunc(e)
    setOpen(false);
  }

  function refreshPage() {
    // window.location.reload(false);
    setusermsg('')

    setstateCommands([""])
    setstateControllers([""])
    setstateCommandsPorts([""])
    setstateCommandsV('')
    setstateControllersV('')
    setstateCommandsPortsV('')

    setisSectorsNumbers('')
    setisNumberOfSectors('')
    setisFileName('')
    setisTotalSector('')
    setisListOfSector('')
    setisMode('')
    setlistofNumbers2([""])
    setprocess([""])
    setbootloader([""])
    setloading(false)
    setfinishcode(false)
    setportmsg('')
    socket.emit("reset_ports");
    socket.emit("get_list_of_commands", () => {
    });
    socket.emit("get_list_of_controllers", () => {
    });
    socket.emit("get_list_of_ports", () => {
    });

  }
  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <h1>Update Program</h1>
              <br />
              <form className={classes.form} noValidate>
                <Autocomplete
                  value={stateCommandsV}
                  fullWidth
                  onChange={(event, newValue) => {
                    setstateCommandsV(newValue);
                  }}
                  id="command"
                  options={stateCommands}
                  renderInput={(params) => (
                    <TextField {...params} label="command" variant="outlined" />
                  )}
                />
                <br />

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
                <br />

                <Commands
                  currentcom={stateCommandsV}
                  listOfNumber={listOfNumber}
                  setisNumberOfSectors={setisNumberOfSectors}
                  setlistofNumbers2={setlistofNumbers2}
                  setlistofNumbers2={setlistofNumbers2}
                  isMode={isMode}
                  setisMode={setisMode}
                  listofNumbers2={listofNumbers2}
                  isListOfSector={isListOfSector}
                  setisListOfSector={setisListOfSector}
                  isTotalSector={isTotalSector}
                  setisTotalSector={setisTotalSector}
                  isFileName={isFileName}
                  setisFileName={setisFileName}
                  setisSectorsNumbers={setisSectorsNumbers}
                  isNumberOfSectors={isNumberOfSectors}
                  isSectorsNumbers={isSectorsNumbers}
                />
                <h5>{usermsg}</h5>
                {/*{!finishcode && (*/}
                {(
                  <Button
                    onClick={areYouSure}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}>
                    Execute
                  </Button>
                )}
                {finishcode && (
                  <Button
                    onClick={refreshPage}
                    variant="contained"
                    color="primary"
                    fullWidth>
                    Reset port
                  </Button>
                )}
              </form>
            </div>
          </Container>
        </Grid>
        <Grid item xs={5}>
          <CssBaseline />
          <div className={classes.paper}>
            {finishcode && (
              <div>
                <h2>System msg:</h2>
                <p>{portmsg}</p>
                <br />
                <MsgCard
                  bootloader={bootloader}
                  process={process}
                  loading={loading}
                  mycommand={stateCommandsV}
                />
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <div>
        <Dialog
            open={open}
            onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Writing commands alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This command might override data on the controller, are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleProceed} color="primary" autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UpdateProgram;

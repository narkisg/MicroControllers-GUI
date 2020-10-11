import React, { useState, useEffect } from "react";
import Auto from "../components/Auto";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as io from "socket.io-client";
import Commands from "../components/Commands";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card, CardContent, TextField } from "@material-ui/core";
import MsgCard from "../components/MsgCard";
var socket;
socket = io("http://localhost:5000");

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

const UpdateProgram = () => {
  const classes = useStyles();
  const [usermsg, setusermsg] = useState("");

  const [stateCommands, setstateCommands] = useState([""]);
  const [stateControllers, setstateControllers] = useState([""]);
  const [stateCommandsPorts, setstateCommandsPorts] = useState([""]);

  const [stateCommandsV, setstateCommandsV] = useState("");
  const [stateControllersV, setstateControllersV] = useState("");
  const [stateCommandsPortsV, setstateCommandsPortsV] = useState("");

  const [isAddress, setisAddress] = useState("");
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

  // prosess:
  useEffect(() => {
    socket.on("execute_command_bootloader_response", (reply) => {
      if (reply) {
        setbootloader(reply.message);
      } else {
        setbootloader(reply.message);
      }
    });
  }, []);
  // bootloader:
  useEffect(() => {
    socket.on("execute_command_process_response", (reply) => {
      if (reply) {
        setprocess(reply);
      } else {
      }
    });
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
  }, []);
  useEffect(() => {
    socket.on("execute_command_response", (reply) => {
      if (reply.success === "true") {
        setusermsg(reply.message);
      } else {
        setusermsg(reply.message);
      }
    });
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
      if (stateCommandsV === "BL_GO_TO_ADDR") {
        if (!isAddress) {
          setusermsg("empty field");
        } else {
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: { address: isAddress },
          });
        }
      } else if (stateCommandsV === "BL_FLASH_ERASE") {
        if (!isSectorsNumbers || !isNumberOfSectors) {
          setusermsg("empty field");
        } else {
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
        if (!isFileName || !isAddress) {
          setusermsg("empty field");
        } else {
          alert(isFileName)
          socket.emit("execute_command", {
            port_name: stateCommandsPortsV,
            controller_name: stateControllersV,
            command_name: stateCommandsV,
            additional_parameters: {
              file_name: isFileName,
              address: isAddress,
            },
          });
        }
      } else if (stateCommandsV === "BL_EN_R_W_PROTECT") {
        if (!isTotalSector || !isListOfSector || !isMode) {
          setusermsg("empty field");
        } else {
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
          alert(stateCommandsPortsV);
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

  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                UpdateProgram
              </Typography>
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
                  isAddress={isAddress}
                  setisAddress={setisAddress}
                  isSectorsNumbers={isSectorsNumbers}
                />
                <h5>{usermsg}</h5>
                <Button
                  onClick={onSubmitFunc}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}>
                  submit
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              System msg:
            </Typography>
            <br/>
            <MsgCard bootloader={bootloader} process={process} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateProgram;

import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import * as io from "socket.io-client";
let socket;

const PortControllersMap = (props) =>{
    const port = props.port
    if (!port) {
        return (
            <div>
                <p>Please submit port to check</p>
            </div>
        )
    }
    else {
        const [cotrollersMap, setCotrollersMap] = useState({})
        const [row, setRow] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            socket = io("http://localhost:5000");
            return () => socket.disconnect();
        }, []);


        useEffect(() => {
            socket.on("discover_controllers_status_by_port_response", (reply) => {
                if (reply) {
                    setCotrollersMap(JSON.parse(reply))
                    setLoading(false)
                }
                return () => socket.off("discover_controllers_status_by_port_response");
            });
        }, []);

        useEffect(() => {
            console.log("emitting")
            socket.emit("discover_controllers_status_by_port", {
                port: port
            });
        }, []);

        const createRow = (key, value) => {
            let arrayList = [];
            for (const controller of value) {
                arrayList.push(controller.toString() + " ")
            }
            const newVal = arrayList.toString()
            return {key, newVal}
        }

        useEffect(() => {
            let data = [];
            for (const [key, value] of Object.entries(cotrollersMap)) {
                data.push(createRow(key, value))
            }
            setRow(rows => rows.concat(data))
        }, [cotrollersMap])

        const useStyles = makeStyles({
            table: {
                minWidth: 300,
            },
        });

        const classes = useStyles();

        return (
            <TableContainer component={Paper}>
                {loading ? <div align="center"><CircularProgress/></div> : null}
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <b>Port</b></TableCell>
                            <TableCell align="right"><b>Controllers</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row) => (
                            <TableRow key={row.key}>
                                <TableCell component="th" scope="row">
                                    {row.key}
                                </TableCell>
                                <TableCell align="right">{row.newVal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default PortControllersMap;
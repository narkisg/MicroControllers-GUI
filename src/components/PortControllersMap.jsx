import React, {useEffect, useState} from "react";
import * as io from "socket.io-client";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

let socket;

const PortControllersMap = (props) =>{
    const [cotrollersList, setCotrollersList] = useState({})
    const [row, setRow] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        socket = io("http://localhost:5000");
        return () => socket.disconnect();
    }, []);


    useEffect(() => {
        socket.on("discover_controllers_status_by_port_response", (reply) => {
            if (reply) {
                setCotrollersList(JSON.parse(reply))
                setLoading(false)
            }
            return () => socket.off("discover_controllers_status_by_port_response");
        });
    },[]);

    useEffect(() => {
        console.log("emitting")
        socket.emit("discover_controllers_status_by_port", () => {
        });
    }, []);

    useEffect(()=>{
        setRow(row => row.concat(cotrollersList))
    },[cotrollersList])


    const useStyles = makeStyles({
        table: {
            minWidth: 300,
        },
    });

    const classes = useStyles();

    return(
        <TableContainer component={Paper}>
            {loading?<CircularProgress />:null}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> <b>Port</b></TableCell>
                        <TableCell align="right"><b>Controllers</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow key={row.key}>
                            <TableCell component="th" scope="row">
                                {props.port}
                            </TableCell>
                            <TableCell align="right">{row}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default PortControllersMap;
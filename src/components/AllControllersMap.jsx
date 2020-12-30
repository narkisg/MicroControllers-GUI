import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as io from "socket.io-client";
let socket;

const AllControllersMap = () => {
    const createRow = (key,value) => {
        let arrayList = [];
        for (const controller of value){
            arrayList.push(controller.toString()+" ")
        }
        const newVal = arrayList.toString()
        return{key,newVal}
    }

    const [portsMap, setPortsMap] = useState({})
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        socket = io("http://localhost:5000");
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        socket.on("discover_controllers_status_all_ports_response", (reply) => {
            if (reply) {
                setPortsMap(JSON.parse(reply))
                setLoading(false)
            }
            return () => socket.off("discover_controllers_status_all_ports_response");
        });
    },[]);

    useEffect(() => {
        socket.emit("discover_controllers_status_all_ports", () => {
        });
    }, []);

    useEffect(()=>{
        let data = [];
        for (const [key, value] of Object.entries(portsMap)) {
            data.push(createRow(key,value))
        }
        setRows(rows=>rows.concat(data))
    },[portsMap])


    const useStyles = makeStyles({
        table: {
            minWidth: 300,
        },
    });

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            {loading?<div align="center"><CircularProgress  /></div>:null}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> <b>Port</b></TableCell>
                        <TableCell align="right"><b>Controllers</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
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
export default AllControllersMap;

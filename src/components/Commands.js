import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import UploadFile from "./UploadFile";
var socket;


export default function Commands(props) {
  const [fields, setFields] = useState([""]);
  const inputtext = props.currentcom;

  useEffect(() => {
    socket = io("http://localhost:5000");
    return () => socket.disconnect()
  }, []);

  useEffect(() => {
    var templist = [];
    for (var i = 0; i <= parseInt(props.isSectorsNumbers); i++) {
      var num = i.toString();
      templist.push(num);
    }
    props.setlistofNumbers2(templist);
  }, [props.isSectorsNumbers]);

  useEffect(() => {
    socket.on("get_fields_response", (reply) => {
      if (reply) {
        const map1 = JSON.parse(reply);
        // alert(typeof map1);
        setFields(map1.list);
      } else {
        alert("error");
      }
    });
    return () => socket.off("get_fields_response")
  }, []);

  useEffect(() => {
    // alert("hi");
    socket.emit("get_fields", { name: inputtext });
  }, [fields]);

  return (
    <div>
      {/* sector_number: */}
      {fields.includes("sector_number") && (
        //   0-8
        <div>
          <br />{" "}
          <Autocomplete
            value={props.isSectorsNumbers}
            fullWidth
            onChange={(event, newValue) => {
              props.setisSectorsNumbers(newValue);
            }}
            id="sector_number"
            options={props.listOfNumber}
            renderInput={(params) => (
              <TextField {...params} label="sector_number" variant="outlined" />
            )}
          />
          <br />
        </div>
      )}
      {/* umber_of_sectors_to_erase: */}
      {/* 0- */}
      {fields.includes("number_of_sectors_to_erase") && (
        <div>
          <br />{" "}
          <Autocomplete
            value={props.isNumberOfSectors}
            fullWidth
            onChange={(event, newValue) => {
              props.setisNumberOfSectors(newValue);
            }}
            id="number_of_sectors_to_erase"
            options={props.listofNumbers2}
            renderInput={(params) => (
              <TextField
                {...params}
                label="number_of_sectors_to_erase"
                variant="outlined"
              />
            )}
          />
          <br />
        </div>
      )}
      {/* file_name: */}
      {fields.includes("file_name") && (
        <div>
          <br />
          <UploadFile setFile={props.setisFileName} file={props.isFileName} />
        </div>
      )}
      {/* total_sector: */}
      {fields.includes("total_sector") && (
        <div>
          <br />{" "}
          <Autocomplete
            value={props.isTotalSector}
            fullWidth
            onChange={(event, newValue) => {
              props.setisTotalSector(newValue);
            }}
            id="total_sector"
            options={props.listOfNumber}
            renderInput={(params) => (
              <TextField {...params} label="total_sector" variant="outlined" />
            )}
          />
          <br />
        </div>
      )}
      {/* list_of_sector_numbers: */}
      {fields.includes("list_of_sector_numbers") && (
        <div>
          <br />{" "}
          <TextField
            variant="outlined"
            fullWidth
            id="list_of_sector_numbers"
            label="list_of_sector_numbers"
            name="list_of_sector_numbers"
            onChange={(e) => props.setisListOfSector(e.target.value)}
          />
          <br />
        </div>
      )}
      {/* mode: */}
      {fields.includes("mode") && (
        <div>
          <br />{" "}
          <Autocomplete
              value={props.isMode}
              fullWidth
              onChange={(event, newValue) => {
                props.setisMode(newValue);
              }}
              id="mode"
              options={["1","0"]}
              renderInput={(params) => (
                  <TextField {...params} label="mode" variant="outlined" />
              )}
          />
          <br />
        </div>
      )}
    </div>
  );
}

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
} from "@material-ui/core";
import React from "react";

export default function MsgCard(props) {
  const { bootloader, process, loading,mycommand } = props;
  const sampleJSON = {
    object: process,
  };
  const booli = false;

  return (
    <div>
      {!loading && (
        <div>
          <Card>
            <CardContent>
              <div>
                <h3>command:</h3>
                <p> {mycommand}</p>
                <h3>process arguments: </h3>
                {/* text */}
                {Object.keys(sampleJSON.object).map((key, i) => (
                  <p key={i}>
                    <span>{key}</span>
                    <span>: {sampleJSON.object[key]}</span>
                  </p>
                ))}

                <h3>bootloader reply:</h3>
                {/* text */}
                <p>{bootloader}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {loading && (
        <div>
          <center>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms",
              }}
              unmountOnExit>
              <CircularProgress />
            </Fade>
          </center>
        </div>
      )}
    </div>
  );
}

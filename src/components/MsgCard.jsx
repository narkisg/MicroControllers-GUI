import { Card, CardContent } from "@material-ui/core";
import React from "react";

export default function MsgCard(props) {
  const { bootloader, process } = props;
  const sampleJSON = {
    object: {
      name: "Pluralsight",
      number: 1,
      address: "India",
      website: "https://www.pluralsight.com/",
    },
  };

  return (
    <div>
      <Card>
        <CardContent>
          <h1>system meesseges</h1>
          <h3>process arguments:</h3>
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
        </CardContent>
      </Card>
    </div>
  );
}

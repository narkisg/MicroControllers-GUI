// import React from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
//
// export default function Auto(props) {
//   const [value, setValue] = React.useState(props.options[0]);
//   // const { inputValue, setInputValue } = props;
//   const [inputValue, setInputValue] = React.useState("");
//   return (
//     <div>
//       <Autocomplete
//         value={value}
//         fullWidth
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         id={props.id}
//         options={props.options}
//         renderInput={(params) => (
//           <TextField {...params} label={props.lable} variant="outlined" />
//         )}
//       />
//     </div>
//   );
// }

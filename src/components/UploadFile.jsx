import React from "react";

export default function UploadFile(props) {
  // State to store uploaded file

  // Handles file upload event and updates state
  function handleUpload(event) {
    props.setFile(event.target.files[0].path);
    // Add code here to upload file to server
    // ...
  }
  return (
    <div>
      <div id="upload-box">
        <input type="file" onChange={handleUpload} />
        <p>FilePath: {props.file}</p>
      </div>
    </div>
  );
}

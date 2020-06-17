import React, { useState } from "react";

const ACCEPTED_FILE_EXTENSIONS = ["png", "jpg", "pdf"];

const ContainerUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [validInput, setValidInput] = useState(true);

  const handleFileChange = (event) => {
    const receivedFiles = event.target.files;
    var areFilesValid = true;

    //TBD: This shall probably go to a separate function, its objective is to check if all files inputed have the proper format
    for (var i = 0; i < receivedFiles.length; i++) {
      var receivedFileName = receivedFiles[i].name;
      for (var extension in ACCEPTED_FILE_EXTENSIONS) {
        if (
          receivedFileName.toLowerCase().slice(-3) ==
          ACCEPTED_FILE_EXTENSIONS[extension]
        ) {
          console.log("accepted");
          areFilesValid = true;
        }
      }
    }

    if (areFilesValid) {
      setFiles(receivedFiles);
      setDisableBtn(false);
      setValidInput(true);
    } else {
      setValidInput(false);
    }

    console.log(receivedFiles.length);
  };

  const invalidFileTypeWarning = () => {
    if (!validInput) {
      return <span>Invalid File Type Selected</span>;
    }
  };

  let ContainerUploadContent = (
    <React.Fragment>
      <div>
        <div>
          <button disabled={disableBtn}>Upload</button>
        </div>
        <div>
          <input type="file" onChange={handleFileChange} multiple />
          <label htmlFor="inputGroupFile01">Choose file</label>
        </div>
      </div>

      {invalidFileTypeWarning()}
    </React.Fragment>
  );

  return ContainerUploadContent;
};

export default ContainerUpload;

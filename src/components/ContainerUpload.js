import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import * as ReactBootStrap from "react-bootstrap";
require("dotenv").config();

const ACCEPTED_FILE_EXTENSIONS = { png: true, jpg: true, pdf: true };

const ContainerUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [validInput, setValidInput] = useState(true);
  const [waitingAPIFile, setwaitingAPIFile] = useState(false);

  const loadButton = (loadingText) => {
    return (
      <div>
        <ReactBootStrap.Spinner animation="border" variant="info" />
        <a>{loadingText}</a>
      </div>
    );
  };

  const initializeSocketWithApi = () => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL, {
      transports: ["websocket", "polling"],
    });
    socket.on("FileProcessing", (receivedData) => {
      console.log(receivedData);
      var blob = new Blob([receivedData.file[0]], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${receivedData.name}`);
      link.click();
    });
    socket.on("Done", () => {
      setwaitingAPIFile(false);
      socket.close();
    });
  };

  useEffect(() => {});

  const handleFileChange = (event) => {
    const receivedFiles = event.target.files;
    var areFilesValid = true;

    const receivedFilesValid = Object.values(receivedFiles).map((file) => {
      let validFiles = [];

      const fileExtesion = file.name.toLowerCase().slice(-3);
      if (ACCEPTED_FILE_EXTENSIONS[fileExtesion] === true) {
        validFiles.push(file);
      } else {
        areFilesValid = false;
      }
      return validFiles;
    });

    if (areFilesValid) {
      setFiles(receivedFilesValid);
      setDisableBtn(false);
      setValidInput(true);
    } else {
      setFiles([]);
      setDisableBtn(true);
      setValidInput(false);
    }
  };

  const handleUploadFile = async () => {
    setwaitingAPIFile(true);
    setFiles([]);
    let fd = new FormData();
    const newDate = new Date(Date.now());
    fd.name =
      "fileInput_" +
      newDate.toLocaleDateString().replace(/\//g, "-") +
      "_" +
      newDate.toLocaleTimeString();
    files.map((f) => {
      fd.append(f[0].name, f[0], f[0].name);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}upload`,
      fd,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(`Files uploaded to ${process.env.REACT_APP_API_URL}upload`);
    console.log(`Answer: ${response.data.body}`);
    initializeSocketWithApi();
  };

  const invalidFileTypeWarning = () => {
    if (!validInput) {
      return <span>Invalid File Type Selected</span>;
    }
  };

  let ContainerUploadContent;
  if (waitingAPIFile)
    ContainerUploadContent = loadButton("Estamos processando seus arquivos");
  else {
    ContainerUploadContent = (
      <React.Fragment>
        <div>
          <div>
            <button onClick={handleUploadFile} disabled={disableBtn}>
              Upload
            </button>
          </div>
          <div>
            <input type="file" onChange={handleFileChange} multiple />
            <label htmlFor="inputGroupFile01">Choose file</label>
          </div>
        </div>

        {invalidFileTypeWarning()}
      </React.Fragment>
    );
  }

  return ContainerUploadContent;
};

export default ContainerUpload;

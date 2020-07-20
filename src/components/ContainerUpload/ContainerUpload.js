import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import * as ReactBootStrap from "react-bootstrap";
import Button from "../Button/Button";
import "./ContainerUpload.scss";
import { BsCloudUpload } from "react-icons/bs";

require("dotenv").config();

const ACCEPTED_FILE_EXTENSIONS = { png: true, jpg: true, pdf: true };
const ACCEPTED_MAX_FILE_SIZE_MB = 6.5;

const ContainerUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [validInput, setValidInput] = useState(true);
  const [waitingAPIFile, setwaitingAPIFile] = useState(false);

  const loadButton = (loadingText) => {
    return (
      <div>
        <ReactBootStrap.Spinner animation="border" variant="warning" />
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
      if (
        ACCEPTED_FILE_EXTENSIONS[fileExtesion] === true &&
        file.size < ACCEPTED_MAX_FILE_SIZE_MB * 1000000
      ) {
        validFiles.push(file);
      } else {
        areFilesValid = false;
      }
      console.log(file.size);
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
    setDisableBtn(true);
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
      return (
        <span>{`Invalid File Type Selected or file larger than ${ACCEPTED_MAX_FILE_SIZE_MB}Mb`}</span>
      );
    }
  };

  const currrentOption = () => {
    if (waitingAPIFile) return loadButton("Estamos processando seus arquivos");
    else {
      return (
        <div className="upload-btngroup">
          <div className="upload-btngroup-btn">
            <label htmlFor="upload">
              <BsCloudUpload /> Adicionar arquivos...
            </label>
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <Button
            className="upload-btngroup-btn"
            onClick={handleUploadFile}
            disabled={disableBtn}
          >
            Enviar
          </Button>

          {invalidFileTypeWarning()}
        </div>
      );
    }
  };

  const ContainerUploadContent = (
    <React.Fragment>
      <div className="upload">
        <h1 className="upload-title">Faça um teste você mesmo!</h1>
        {currrentOption()}
      </div>
    </React.Fragment>
  );

  return ContainerUploadContent;
};

export default ContainerUpload;

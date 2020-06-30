import React, { useState, useEffect } from "react";
import axios from "axios";
import GCP_TOKEN from "./token.json";

const ACCEPTED_FILE_EXTENSIONS = { png: true, jpg: true, pdf: true };
const BUCKET_NAME = "bucket-document-ai";
const PROJECT_ID = "document-ai";

const ContainerUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [filesProcessed, setFilesProcessed] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [validInput, setValidInput] = useState(true);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    let events;

    events = new EventSource("http://localhost:8080/events");
    events.onopen = (event) => {
      console.log("Connection oppened");
    };
    events.onmessage = (event) => {
      console.log(event, "Event Received");
      const parsedData = JSON.parse(event.data);

      setFilesProcessed((filesProcessed) => filesProcessed.concat(parsedData));
    };
  }, [filesProcessed]);

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

    const gcpConfig = {
      headers: {
        Authorization: "Bearer " + GCP_TOKEN.token,
      },
    };
    // const source = new EventSource("http://localhost:3000/respstadouploac");

    // source.addEventListener();

    const response = await axios.post("http://localhost:8080/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // axios
    //   .post(
    //     // "https://storage.googleapis.com/upload/storage/v1/b/" +
    //     //   BUCKET_NAME +
    //     //   "/o?uploadType=media&name=" +
    //     //   fd.name,
    //     fd,
    //     gcpConfig
    //   )
    //   .then((e) => console.log(e));

    console.log("File Uploaded: " + fd.name);
    console.log(response.data.body);
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

  return ContainerUploadContent;
};

export default ContainerUpload;

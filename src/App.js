import React from "react";
import { useState } from "react"; //if module doesn't have an export dafault, it needs brackets
import "./App.css";

const myCLick = (setFiles, files) => {
  const newFiles = { key1: "helloworld", ...files }; //spread operator,  it creates a copy of files, this way it doesn't point to the previous files,
  setFiles(newFiles);
};

function ContainerUpload() {
  const [files, setFiles] = useState({}); //{} is a dic | setFiles is the only function that control files var
  console.log(files);
  return (
    <div>
      <div>
        <button
          onClick={async () => {
            //Check async
            myCLick(setFiles, files);
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContainerUpload />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React from "react";
import { useState } from "react"; //if module doesn't have an export dafault, it needs brackets
import ContainerUpload from "./components/ContainerUpload";

function App() {
  return (
    <div className="App">
      <ContainerUpload />
    </div>
  );
}

export default App;

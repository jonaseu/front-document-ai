import React, { useState, useEffect } from "react";
import ContainerUpload from "./components/ContainerUpload";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const App = () => {
  const [hasApiConnection, setHasApiConnection] = useState(false);
  let poolApi;

  const checkApiConnection = async () => {
    console.log(
      `Checking communication with API at ${process.env.REACT_APP_API_URL}liveness`
    );
    try {
      const checkLiveness = await axios
        .get(`${process.env.REACT_APP_API_URL}liveness`)
        .then((res) => {
          setHasApiConnection(true);
          clearInterval(poolApi);
          console.log("API is communicating");
        });
    } catch (e) {
      setHasApiConnection(false);
    }
  };

  const loadButton = (loadingText) => {
    return (
      <div>
        <ReactBootStrap.Spinner animation="border" variant="info" />
        <a>{loadingText}</a>
      </div>
    );
  };

  useEffect(() => {
    poolApi = setInterval(() => {
      checkApiConnection();
    }, 10000);
    checkApiConnection();
  }, []);

  let appContent;
  if (hasApiConnection) {
    appContent = <ContainerUpload />;
  } else {
    appContent = loadButton("Esperando serviço inicializar");
  }

  return appContent;
};

export default App;

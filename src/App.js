import React, { useState, useEffect } from "react";
import ContainerUpload from "./components/ContainerUpload/ContainerUpload";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import MainBanner from "./components/MainBanner/MainBanner";
import ImageBanner from "./components/ImageBanner/ImageBanner";

import logoImage from "./images/logo.png";

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
        <ReactBootStrap.Spinner animation="border" variant="warning" />
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
    appContent = (
      <>
        <Navbar logo={logoImage} />
        <MainBanner
          title="Documentos são essenciais para qualquer negócio, não deixe que isso seja um problema para o seu"
          subtitle="Docton busca simplificar o processamento desses documentos"
          buttonText="ENTENDA MAIS"
        />
        <ImageBanner subtitle="Acelere e melhore processos de input manuais do seu negócio através de inteligência artificial" />
        <ContainerUpload />
      </>
    );
  } else {
    appContent = (
      <>
        <Navbar logo={logoImage} />
        {loadButton("Esperando serviço inicializar")}
      </>
    );
  }

  return appContent;
};

export default App;

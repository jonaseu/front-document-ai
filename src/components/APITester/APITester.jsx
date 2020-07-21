import React, { useState, useEffect } from "react";
import ContainerUpload from "../ContainerUpload/ContainerUpload";
import axios from "axios";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./APITester.scss";

const APITester = () => {
  const [hasApiConnection, setHasApiConnection] = useState(false);
  let poolApi;

  const checkApiConnection = async () => {
    console.log(
      `Checking communication with API at ${process.env.REACT_APP_API_URL}liveness`
    );
    try {
      await axios
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

  useEffect(() => {
    poolApi = setInterval(() => {
      checkApiConnection();
    }, 10000);
    checkApiConnection();
  }, []);

  return (
    <div className="api-container">
      {hasApiConnection ? (
        <ContainerUpload />
      ) : (
        <LoadingIndicator> Esperando Serviço Inicializar </LoadingIndicator>
      )}
    </div>
  );
};

export default APITester;

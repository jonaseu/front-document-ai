import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./LoadingIndicator.scss";

const LoadingIndicator = ({ children, ...otherProps }) => (
  <div className="loading">
    <ReactBootStrap.Spinner
      dialogClassName="loading-spinner"
      animation="border"
      variant="warning"
    />
    <h2 className="loading-text">{children}</h2>
  </div>
);

export default LoadingIndicator;

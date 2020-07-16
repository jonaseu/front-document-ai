import React from "react";
import "./ImageBanner.scss";

const ImageBanner = (props) => {
  return (
    <div className="imagebanner">
      <div className="imagebanner-subtitle">{props.subtitle}</div>
    </div>
  );
};

export default ImageBanner;

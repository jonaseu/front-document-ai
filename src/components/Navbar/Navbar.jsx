import React from "react";
import Button from "../Button/Button";
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <img className="navbar-logo" src={props.logo} />
      <Button className="navbar-btn">Sign In</Button>
    </div>
  );
};

export default Navbar;

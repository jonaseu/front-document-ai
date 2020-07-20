import React from "react";
import Button from "../Button/Button";
import "./Navbar.scss";
import logoImage from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <Link className="navbar-logo-container" to="/">
        <img className="navbar-logo" src={logoImage} />
      </Link>
      <Button className="navbar-btn">Sign In</Button>
    </div>
  );
};

export default Navbar;

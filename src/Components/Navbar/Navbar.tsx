import React, { FunctionComponent } from "react";
import logo from "../../Assets/Icons/logo.svg";
import "./Styles.css";

const Navbar: FunctionComponent<{}> = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
    </header>
  );
};

export default Navbar;
